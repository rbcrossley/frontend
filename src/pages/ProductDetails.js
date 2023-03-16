import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails, getRelatedProducts } from '../api/productAPI'
import Cards from '../components/Card.js'
import Navbar from '../components/layout/Navbar'
import { addItemsToCart } from '../components/reducers/cartAction.js'
import { API } from '../config'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelated] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    getProductDetails(id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProduct(data)
          console.log(data)
        }
      })
    getRelatedProducts(id)
      .then(data => setRelated(data))
  }, [id])

  const add_to_cart = (e) => {
    e.preventDefault()
    dispatch(addItemsToCart(id, 1))
  }
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row align-items-center shadow-lg my-5'>
          <div className='col-md-6 p-5'>
            <img src={`${API}/${product.product_image}`} alt={product.product_name} className='w-100' />
          </div>
          <div className='col-md-6 p-5'>
            <h3>{product.product_name}</h3>
            <h3>Price: {product.product_price}</h3>
            <h3>Description: {product.product_description}</h3>
            <h3>Count in Stock: {product.count_in_stock}</h3>
            <button className='btn btn-warning mt-2' onClick={add_to_cart}>Add to Cart</button>
          </div>
        </div>
        <hr />
        <div className="row">
          {
            relatedProducts.slice(0, 4).map(prod => {
              return <div className="col-md-3">
                <Cards item={prod} key={prod._id} />
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default ProductDetails