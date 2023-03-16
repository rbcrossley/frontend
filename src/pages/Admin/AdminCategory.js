import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { deleteCategory, getAllCategories } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI.js'
import AdminSidebar from '../../components/layout/AdminSidebar'
import Navbar from '../../components/layout/Navbar'
import AddCategoryForm from './AddCategory'
import UpdateCategoryForm from './UpdateCategoryForm'

const AdminCategory = () => {
  const [categories, setCategories] = useState([])
  const [addCategory, setAddCategory] = useState(false)
  const [updateCategory, setUpdateCategory] = useState('')
  const [success, setSuccess] = useState('')
  const { token } = isAuthenticated()

  const updatePage = () => {
    setSuccess(true)
    setAddCategory(false)
    setUpdateCategory('')
  }
  const showAddForm = () => {
    setAddCategory(true)
    setUpdateCategory('')
    setSuccess(false)
  }

  const showUpdateForm = (id) => e => {
    e.preventDefault()
    setUpdateCategory(id)
    setSuccess(false)
    setAddCategory(false)
  }




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
  }, [success])

  const handleDelete = id => e => {
    setSuccess(false);
    e.preventDefault();
    //show alert
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //if yes then delete


        try {
          deleteCategory(id, token)
          Swal.fire(
            'Deleted!',
            'Category deleted successfully.',
            'success'
          )
          setSuccess(true)
        }
        catch (error) {
          Swal.fire(error)
        }

      }
      else {
        // if no then return 
        Swal.fire({ title: "Delete cancelled", timer: 3000, showConfirmButton: false })

      }
    })



  }
  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <AdminSidebar category />
          </div>
          <div className='col-sm-12 col-md-9 p-5'>
            <div className='w-75 m-auto d-flex justify-content-between'>
              <h3>Categories</h3>
              <button className='btn btn-success' onClick={showAddForm}>Add New Category</button>
            </div>
            <div className='container w-75'>
              {
                addCategory &&
                <AddCategoryForm updatePage={updatePage}></AddCategoryForm>
              }
              {
                updateCategory &&
                <UpdateCategoryForm id={updateCategory} updatePage={updatePage} />
              }

              <table className='table table-bordered text-center table-hover table-striped'>
                <thead className='table-dark'>
                  <tr>
                    <td>S.No.</td>
                    <td>Category Name</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories && categories.map((category, i) => {
                      return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{category.category_name}</td>
                        <td>
                          <div className='btn-group'>
                            <button className='btn btn-warning' onClick={showUpdateForm(category._id)}>
                              Update <i className='bi bi-pencil-square'></i></button>
                            <button className='btn btn-danger' onClick={handleDelete(category._id)}>Delete <i className='bi bi-trash'></i></button>
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
      </div>
    </>
  )
}

export default AdminCategory