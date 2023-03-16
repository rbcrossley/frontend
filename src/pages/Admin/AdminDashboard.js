import React from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar.js'
import Navbar from '../../components/layout/Navbar.js'

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-sm-12 col-md-9 p-5">
            <h3>Welcome to admin dashboard</h3>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminDashboard