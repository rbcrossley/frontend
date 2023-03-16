import React, { useEffect, useReducer, useState } from 'react'
import { getAllCategories } from '../../api/categoryAPI.js'
import { addNewProduct } from '../../api/productAPI.js'
import { isAuthenticated } from '../../api/userAPI.js'
import AdminSidebar from '../../components/layout/AdminSidebar.js'
import Navbar from '../../components/layout/Navbar.js'

const AddProduct = () => {
  const { token } = isAuthenticated()
  const productReducer = (state, event) => {
    switch (event.target.name) {
      case "product_image":
        state.formdata.set(event.target.name, event.target.files[0])
        return { ...state, [event.target.name]: event.target.files[0] }
      default:
        state.formdata.set(event.target.name, event.target.value)
        return { ...state, [event.target.name]: event.target.value }

    }
  }
  const [product, setProduct] = useReducer(productReducer, { formdata: new FormData, error: "", success: false })
  const [formdata, setFormData] = useState()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setCategories(data)
        }
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProduct(product.formdata, token)
      .then(data => {
        if (data.error) {
          setSuccess(false)
          setError(data.error)
        }
        else {
          setError("")
          setSuccess(true)
        }
      })

  }


  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess = () => {
    if (success) {
      return <div className='alert alert-success'>Product Added Successfully</div>
    }
  }
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <AdminSidebar product />
          </div>

          <div className="col-sm-12 col-md-9 p-5">
            <h3>Add New Product</h3>
            <form action="" className="p-5 shadow-lg w-75">
              {showError()}
              {showSuccess()}
              <label htmlFor="product_name">Product Name</label>
              <input type={"text"} id="product_name" name={"product_name"} className="form-control" onChange={setProduct} />

              <label htmlFor="product_price">Product Price</label>
              <input type={"number"} id="product_price" name={"product_price"} className="form-control" onChange={setProduct} />


              <label htmlFor="product_description">Product description </label>
              <textarea rows={3} className="form-control" id="product_description" name={'product_description'} onChange={setProduct} />

              <label htmlFor="count_in_stock">Count in stock</label>
              <input type={"number"} id="count_in_stock" name={"count_in_stock"} className="form-control" onChange={setProduct} />

              <label htmlFor="product_image">Product Image</label>
              <input type={"file"} id="product_image" className="form-control" name={"product_image"} onChange={setProduct} />

              <label htmlFor="category">Category</label>
              <select name="category" id="category" className="form-control" onChange={setProduct}>
                <option value="">Select category</option>
                {
                  categories && categories.map(category => {
                    return <option key={category._id} value={category._id}> {category.category_name}</option>
                  })
                }
              </select>
              <button className="btn btn-warning mt-2 w-100" onClick={handleSubmit}>Add New Category</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default AddProduct
