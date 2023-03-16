import React, { useState } from 'react'
import { addNewCategory } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI'

const AddCategoryForm = ({updatePage}) => {
  let [category, setCategory] = useState('')
  const {token} = isAuthenticated()
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewCategory(category, token)
    .then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        setSuccess(true)
        setCategory('')
        updatePage()
        
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
      return <div className='alert alert-success'>Category Added Successfully</div>
    }
  }


  return (
    <>
        <form className='p-5 my-3 shadow-lg'>
          {showError()}
          {showSuccess()}
            <h4>Add Category</h4>
            <label htmlFor='category_name'>Category Name</label>
            <input type={'text'} className='form-control' onChange={e=>setCategory(e.target.value)} value={category}/>
            <button className='btn btn-success mt-2' onClick={handleSubmit}>Add Category</button>
        </form>
    </>
  )
}

export default AddCategoryForm