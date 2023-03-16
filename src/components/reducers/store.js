import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { cartReducer } from "./cartReducer.js"

const initialState = {
  cart: {
    cart_items: localStorage.getItem("cart_items") ? JSON.parse(localStorage.getItem("cart_items")) : [],
    shipping_info: localStorage.getItem("shipping_info") ? JSON.parse(localStorage.getItem("shipping_info")) : {}
  }
}
const middleware = [thunk]
const rootReducer = combineReducers({
  cart: cartReducer
})

export const myStore = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))