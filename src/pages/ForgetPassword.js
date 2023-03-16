import React, { useState } from 'react'
import { forgetPassword } from '../api/userAPI.js'
import Navbar from '../components/layout/Navbar.js'

const ForgetPassword = () => {

  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    forgetPassword(email)
      .then(data => {
        if (data.error) {
          setError(data.error)

        }
        else {
          setSuccess(data.message)
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
      return <div className='alert alert-success'>{success}</div>
    }
  }

  return (
    <>
      <Navbar />
      {showError()}
      {showSuccess()}
      <h1>Forget Password</h1>
      <form className='w-50 m-auto p-5 shadow-lg'>
        <label htmlFor="email">Email</label>
        <input type={"email"} id="email" className="form-control" onChange={e => setEmail(e.target.value)} />
        <button className='btn btn-warning mt-2' onClick={handleSubmit}>Forget password</button>
      </form>
    </>
  )
}

export default ForgetPassword