import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteProduct, getAllProducts } from '../../api/productAPI'
import { isAuthenticated } from '../../api/userAPI'
import AdminSidebar from '../../components/layout/AdminSidebar'
import Navbar from '../../components/layout/Navbar'
import { API } from '../../config'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const { token } = isAuthenticated()

  useEffect(() => {
    getAllProducts()
      .then(data => {
        if (data.error) {
          console.log(data)
        }
        else {
          setProducts(data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleDelete = id => e => {
    e.preventDefault()
    Swal.fire({
      title: "Confirm Delete",
      html: "Are you sure, you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm Delete!",
      confirmButtonColor: '#dc3545'
    }).then(result => {
      if (result.isConfirmed) {
        deleteProduct(id, token)
          .then(data => {
            if (data.error) {
              Swal.fire("Error", data.error, "error")
            }
            else {
              Swal.fire("Success", "Product Deleted", "info")
            }
          })
      }
    })
      .catch(() => {
        Swal.fire("Cancel", "Delete Cancelled", "info")
      })
  }
  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <AdminSidebar product />
          </div>
          <div className='col-sm-12 col-md-9 p-5'>
            <div className='d-flex justify-content-between'>
              <h3>Products</h3>
              <Link to='/admin/products/add' className='btn btn-warning'>Add New Product</Link>
            </div>
            <table className='table table-hover text-center table-bordered'>
              <thead>
                <tr className='table-dark'>
                  <td>S.No.</td>
                  <td>Product Image</td>
                  <td>Product Name</td>
                  <td>Unit Price</td>
                  <td>Count in Stock</td>
                  <td>Rating</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  products && products.map((product, i) => {
                    return <tr key={product._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${API}/${product.product_image}`} alt={product.product_name} style={{ height: '150px' }} />
                      </td>
                      <td>{product.product_name}</td>
                      <td>Rs.{product.product_price}</td>
                      <td>{product.count_in_stock}</td>
                      <td>{product.rating}</td>
                      <td>
                        <div className='btn-group'>
                          <Link to={`/admin/product/update/${product._id}`} className='btn btn-warning'><i className='bi bi-pencil-square'></i></Link>
                          <button className='btn btn-danger' onClick={handleDelete(product._id)}><i className='bi bi-trash'></i></button>
                        </div>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProducts