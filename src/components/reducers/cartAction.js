import Swal from "sweetalert2"
import { getProductDetails } from "../../api/productAPI.js"
import { ADD_ITEMS_TO_CART, REMOVE_ITEMS, SAVE_SHIPPING } from "./cartConstants.js"

export const addItemsToCart = (product_id, quantity) => async (dispatch, getState) => {
  let data = await getProductDetails(product_id)
  dispatch({
    type: ADD_ITEMS_TO_CART,
    payload: {
      product: data._id,
      product_name: data.product_name,
      product_price: data.product_price,
      count_in_stock: data.count_in_stock,
      product_image: data.product_image,
      quantity
    }
  })
  localStorage.setItem("cart_items", JSON.stringify(getState().cart.cart_items))
}
export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEMS,
    payload: id
  })
  localStorage.setItem("cart_items", JSON.stringify(getState().cart.cart_items))

}

export const saveShippingInfo = (shipping_info) => (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING,
    payload: shipping_info
  })
  localStorage.setItem("shipping_info", JSON.stringify(getState().cart.shipping_info))
}