import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { placeOrder } from '../api/orderAPI.js'
import { processPayment } from '../api/paymentAPI.js'
import { isAuthenticated } from '../api/userAPI.js'
import Navbar from '../components/layout/Navbar.js'

const Payment = () => {
  let stripe = useStripe()
  let elements = useElements()
  let { user } = isAuthenticated()
  let navigate = useNavigate()
  let cart_items = useSelector(store => store.cart.cart_items)
  let shipping_info = useSelector(store => store.cart.shipping_info)

  const makePayment = async (e) => {
    e.preventDefault()
    document.querySelector("#paybtn").disabled = true
    let amount = sessionStorage.getItem("total_amount") * 100
    let res
    try {
      res = await processPayment(amount)
      let client_secret = res.client_secret
      if (!stripe || !elements) {
        document.querySelector("#paybtn").disabled = false
        return
      }
      let result = await stripe.confirmCardPayment(`${client_secret}`, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.username,
            email: user.email
          }

        }
      })
      if (result.error) {
        Swal.fire("Error", result.error.message, "error")
        document.querySelector("#paybtn").disabled = true
      }
      else {
        if (result.paymentIntent.status === "succeeded") {
          //place order
          let order = {
            orderItems: cart_items,
            user: user._id,
            shipping_address: shipping_info.shipping_address,
            alternate_shipping_address: shipping_info.alternate_shipping_address,
            city: shipping_info.city,
            country: shipping_info.country,
            zipcode: shipping_info.zipcode,
            phone: shipping_info.phone
          }
          placeOrder(order)
          //remove cart items from local storage
          localStorage.removeItem("cart_items")
          //navigate to payment success page
          navigate("/paymentsuccess")
        }
      }
    }
    catch (error) {
      Swal.fire("error", error.message, "error")

    }

  }
  return (
    <>
      <Navbar />
      <div className="row w-100 ">
        <div className="col-md-8">
          <h3>Cart Summary</h3>
          <h3>Shipping Information</h3>
        </div>
        <div className="col-md-4">
          <h3><u>Card Details</u></h3>

          <label htmlFor="card_number">Card Number</label>
          <CardNumberElement id="card_number" className='form-control' />

          <label htmlFor="card-expiry">Valid Upto</label>
          <CardExpiryElement id="card-expiry" className='form-control w-50' />

          <label htmlFor="cvc">CVC</label>
          <CardCvcElement id="cvc" className='form-control w-50' />

          <button className='btn btn-warning w-100' id='paybtn' onClick={makePayment}>Make payment</button>



        </div>
      </div>
    </>
  )
}

export default Payment
