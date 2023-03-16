import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../api/userAPI.js'

const AdminSidebar = ({ category, product, order, users }) => {
  const { user } = isAuthenticated()

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" >
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <i className="bi bi-speedometer"></i>
          <span className="fs-4">Admin dashboard</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">

            {category ?
              <Link to="/admin/categories" className="nav-link active" aria-current="page">
                <i className='bi bi-grid'></i>
                Category
              </Link>
              :
              <Link to="/admin/categories" className="nav-link" aria-current="page">
                <i className='bi bi-grid'></i>
                Category
              </Link>
            }
          </li>
          {product ?

            <Link to="/admin/products" className="nav-link  active">
              Products
              <i className='bi bi-grid'></i>
            </Link>

            :
            <Link to="/admin/products" className="nav-link link-dark ">
              Products
              <i className='bi bi-grid'></i>
            </Link>


          }


          <li>

            {order ?
              <Link to="/admin/orders" className="nav-link  active">
                Orders
                <i className='bi bi-table'></i>
              </Link>
              :
              <Link to="/admin/orders" className="nav-link link-dark">
                Orders
                <i className='bi bi-table'></i>
              </Link>
            }
          </li>
          <li>
            {user ?
              <Link to="/admin/users" className="nav-link  active">
                <i className='bi bi-person'></i>
                Users
              </Link>

              :
              <Link to="/admin/users" className="nav-link link-dark">
                <i className='bi bi-person'></i>
                Users
              </Link>


            }
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>{user.username}</strong>
          </Link>
          <ul className="dropdown-menu text-small shadow">
            <li><Link className="dropdown-item" to="#">{user.email}</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><span className="dropdown-item" >Sign out</span></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar