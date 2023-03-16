import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated, login } from '../api/userAPI.js'
import Navbar from '../components/layout/Navbar'


const Login = () => {

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setError] = useState("")
  let [success, setSuccess] = useState(false)
  let navigate = useNavigate()
  const { user } = isAuthenticated()





  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
      .then(data => {
        if (data.error) {
          setError(data.error)
        }
        else {
          // console.log(data)
          authenticate(data)
          setSuccess(true)
        }
      })
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }

  const redirect = () => {
    if (success) {

      if (user && user.role === 1) {
        navigate("/admin/dashboard")
      }
      else {
        navigate("/")
      }
    }
  }
  return (
    <>
      <Navbar />
      {showError()}
      {redirect()}
      {/* login from bootstrap */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-md-10 col-lg-8 col-xl-6">
            <main className="form-signin w-100 m-auto my-5 border border-5 border-secondary rounded rounded-5 p-5 shadow-lg">
              <form>
                {/* to wrap images around a centre  */}
                <div className="text-center">
                  <img className="mb-4" src="./images/asset 23.jpeg" alt="" width="72" height="57" />
                </div>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
                <div className="d-flex justify-content-between">
                  <span>Do not have an account?<Link to="/register">Register</Link>  </span>
                  <Link to="/forgetpassword">Forget Password</Link>
                </div>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
              </form>
            </main>
          </div>
        </div>

      </div>
    </>)
}

export default Login