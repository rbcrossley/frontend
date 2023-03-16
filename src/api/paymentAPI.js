import { API } from "../config.js"

export const getStripeKey = () => {
  return fetch(`${API}/getStripeKey`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const processPayment = (amount) => {
  return fetch(`${API}/processpayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount })
  })
    .then(res => res.json())
    .catch(err => console.log(err))


}