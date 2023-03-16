import { API } from "../config.js"

export const placeOrder = (order) => {
  return fetch(`${API}/placeorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json)
    .catch(err => console.log(err))
}