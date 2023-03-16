import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut } from '../../api/userAPI.js'

const Navbar = () => {
  let cart_items = useSelector(state => state.cart.cart_items)
  cart_items = cart_items.length > 0 ? cart_items.map(item => item.quantity) : 0
  let count = cart_items.length > 0 ? cart_items.reduce((a, c) => a + c) : 0


  let { user } = isAuthenticated()
  let navigate = useNavigate()
  const handleSignout = () => {
    signOut()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          console.log(data.message)
          navigate("/signin")
        }
      })
  }



  return (
    <>
      <div className="container-fluid bg-dark">

        <div className="row">
          <div className="col-md-3 text-center pt-1">
            <Link className="navbar-brand text-white fs-3 fw-bold" to="/">Our store</Link>
          </div>
          <div className="col-md-6 py-2"> <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-warning" type="submit">Search</button>
          </form>
          </div>
          <div className="col-md-3 d-flex justify-content-evenly">

            {
              !user &&
              <>              <Link to="/signin">  <i className="bi bi-box-arrow-in-left fs-3 text-white"></i></Link>
                <Link to="/register"> <i className="bi bi-person-plus fs-3 text-white"></i></Link>
              </>

            }

            {
              user && user.role === 1 &&
              <>
                <Link to="/admin/dashboard"><i className='bi bi-speedometer fs-3 text-white'></i></Link>
              </>
            }

            {
              user && user.role === 0 &&

              <>
                <Link to="/user/profile">
                  <i className='bi bi-person-circle fs-3 text-white'></i>
                </Link>
                <Link to="/cart" className='position-relative'>
                  <i className='bi bi-cart fs-3 text-white'></i>

                  <span className='bg-warning position-absolute top-20 left-100 rounded-circle px-1'>{count}</span>
                </Link>
              </>

            }


            {


              user &&

              <span>

                <i className="bi bi-box-arrow-right fs-3 text-white" role={"button"} onClick={handleSignout}></i>
              </span>
            }




          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deals">Deals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>)
}

export default Navbar