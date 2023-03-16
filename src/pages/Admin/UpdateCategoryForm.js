import React, { useEffect, useState } from 'react'
import { addNewCategory, getCategoryDetail, updateCategory } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI'

const UpdateCategoryForm = ({id, updatePage}) => {
  let [category, setCategory] = useState('')
  const {token} = isAuthenticated()
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)

  useEffect(()=>{
    getCategoryDetail(id)
    .then(data=>{
        if(data.error){
            console.log(data)
            setError(data.error)
        }
        else{
            setCategory(data.category_name)
        }
    })
  }
  ,[success])

  const handleSubmit = (e) => {
    e.preventDefault()
    // addNewCategory(category, token)
    updateCategory(id, category, token)
    .then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        setSuccess(true)
        updatePage()
        // setCategory('')
      }
    })
  }

  const showError = () => {
    if(error){
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess = () => {
    if(success){
      return <div className='alert alert-success'>Category Updated Successfully</div>
    }
  }


  return (
    <>
        <form className='p-5 my-3 shadow-lg'>
          {showError()}
          {showSuccess()}
            <h4>Update Category</h4>
            <label htmlFor='category_name'>Category Name</label>
            <input type={'text'} className='form-control' onChange={e=>setCategory(e.target.value)} value={category}/>
            <button className='btn btn-success mt-2' onClick={handleSubmit}>Update Category</button>
        </form>
    </>
  )
}

export default UpdateCategoryForm