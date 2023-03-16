import React from 'react'
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer';
import AdminRoute from './components/selectiveRoutes/AdminRoute.js';
import UserRoute from './components/selectiveRoutes/UserRoute.js';
import Firstpage from './First';
import Counter from './hooks/Counter';
import DataFetch from './hooks/DataFetch';
import Info from './hooks/Info';
import AddProduct from './pages/Admin/AddProduct.js';
import AdminCategory from './pages/Admin/AdminCategory.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import AdminProducts from './pages/Admin/AdminProducts.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Deals from './pages/Deals';
import EmailConfirmation from './pages/EmailConfirmation.js';
import ForgetPassword from './pages/ForgetPassword.js';
import Home from './pages/Home';
import Login from './pages/Login';
import PaymentComponent from './pages/PaymentComponent.js';
import ProductDetails from './pages/ProductDetails.js';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword.js';
import Shipping from './pages/Shipping.js';
import Counter2 from './redux/Counter2';
import Second from './Second';

const Myroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/first' element={<Firstpage />} />
        <Route path='/second' element={<Second />} />
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Login></Login>} />
        <Route path='/register' element={<Register />} />
        <Route path="/deals" element={<Deals />} />

        <Route path="/" element={<UserRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        {/* hooks */}
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailVerification/:token" element={<EmailConfirmation />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/info" element={<Info />} />
        <Route path="/datafetch" element={<DataFetch />} />
        <Route path="/counter2" element={< Counter2 />} />

        <Route path="/" element={<UserRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<PaymentComponent />} />

        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<AdminCategory />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/product/update/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />} />


      </Routes>
      <Footer />
    </BrowserRouter >
  )
}

export default Myroutes