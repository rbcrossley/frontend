import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { getStripeKey } from '../api/paymentAPI.js'
import Payment from './Payment.js'

const PaymentComponent = () => {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    getStripeKey().then(data => {
      setStripeApiKey(data.STRIPE_API_KEY)
    })
  }, [])

  return (
    <>
      {
        stripeApiKey &&
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      }
    </>
  )
}

export default PaymentComponent