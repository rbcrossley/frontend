import Swal from "sweetalert2"
import { ADD_ITEMS_TO_CART, CLEAR_CART, REMOVE_ITEMS, SAVE_SHIPPING } from "./cartConstants.js"

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEMS_TO_CART:
      const itemExists = state.cart_items.find(item => item.product === action.payload.product)
      if (itemExists) {
        if (action.payload.quantity === 1) {
          Swal.fire("Alert!", `${action.payload.product_name} is already in cart`, "warning")
          return { ...state }
        }
        else {
          if (itemExists.quantity < action.payload.quantity) {
            Swal.fire({
              title: "Success",
              html: "Quantity Increased",
              icon: "Success",
              timer: 3000,
              position: "top-right"
            })
          }
          else {
            Swal.fire({
              title: "Success",
              html: "Quantity Decreased",
              icon: "Success",
              timer: 3000,
              position: "top-right"
            })


          }
          return { ...state, cart_items: state.cart_items.map(item => item.product === action.payload.product ? action.payload : item) }
        }
      }
      else {
        Swal.fire("Congrats!", `${action.payload.product_name} added to cart`, "success")
        return { ...state, cart_items: [...state.cart_items, action.payload] }
      }

    case REMOVE_ITEMS:
      Swal.fire({
        title: "Success",
        html: "Item Removed",
        icon: "Success",
        timer: 3000,
        position: "top-right"
      })
      return { ...state, cart_items: state.cart_items.filter(item => item.product != action.payload) }
    case CLEAR_CART:
      return { ...state, cart_items: [] }
    case SAVE_SHIPPING:
      Swal.fire("Success", "Shipping Address Updated", "success")
      return { ...state, shipping_info: action.payload }
    default:
      return { ...state }
  }
}