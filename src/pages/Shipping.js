import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { saveShippingInfo } from '../components/reducers/cartAction.js'

const Shipping = () => {
  const cart_items = useSelector(state => state.cart.cart_items)
  const shippingInfoReducer = (state, event) => {
    return { ...state, [event.target.name]: event.target.value }
  }
  const [shipping_info, setShippingInfo] = useReducer(shippingInfoReducer, JSON.parse(localStorage.getItem("shipping_info")))
  const dispatch = useDispatch()

  const { shipping_address, contact_person, alternate_shipping_address, city, country, zipcode, phone } = shipping_info

  const save_shipping = (e) => {
    e.preventDefault()
    dispatch(saveShippingInfo(shipping_info))
  }
  return (
    <>
      <Navbar />
      <div className='container'>
        <form className='w-50'>
          <h3>Shipping Information</h3>
          <label htmlFor='name'>
            Contact Person
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="contact_person" onChange={setShippingInfo} value={contact_person} />

          <label htmlFor='name'>
            Shipping Address
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="shipping_address" onChange={setShippingInfo} value={shipping_address} />

          <label htmlFor='name'>
            Alternate Shipping Address
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="alternate_shipping_address" onChange={setShippingInfo} value={alternate_shipping_address} />

          <label htmlFor='name'>
            City
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="city" onChange={setShippingInfo} value={city} />


          <label htmlFor='name'>
            Zipcode
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="zipcode" onChange={setShippingInfo} value={zipcode} />


          <label htmlFor='name'>
            Country
          </label>
          <input type={'text'} id='name' className='form-control mb-2' name="country" onChange={setShippingInfo} value={country} />

          <label htmlFor='name'>
            Phone
          </label>
          <input type={'text'} id='name' name="phone" className='form-control mb-2' onChange={setShippingInfo} value={phone} />

          <button className='btn btn-warning mb-3 w-50' onClick={save_shipping}>Update Shipping Information</button>
          <Link to="/payment" className='btn btn-success mb-3 w-50'>Proceed to Payment</Link>
        </form>
        <div>
          <h3>Cart Summary</h3>
          {/* {
                    cart_items.map(item=>)
                } */}
        </div>
      </div>


    </>
  )
}

export default Shipping