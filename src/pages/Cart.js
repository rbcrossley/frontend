import { Delete, TramSharp } from '@mui/icons-material';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/layout/Navbar'
import { addItemsToCart, removeItemFromCart } from '../components/reducers/cartAction.js';
import { API } from '../config.js';

const Cart = () => {
  let cart_items = useSelector(store => store.cart.cart_items)
  let cart_items_number = cart_items.length > 0 ? cart_items.map(item => item.quantity) : 0
  cart_items_number = cart_items.length > 0 ? cart_items_number.reduce((a, c) => a + c) : 0
  let order_total = cart_items.map(item => item.quantity * item.product_price)
  order_total = cart_items.length > 0 ? order_total.reduce((a, c) => a + c) : 0

  localStorage.setItem("cart_count", cart_items_number)
  sessionStorage.setItem("total_amount", order_total)
  // function createData(
  //   name,
  //   image, price,
  //   quantity
  // ) {
  //   return { name, image, price, quantity };
  // }

  // const rows = [
  //   createData('Samsung F22', "https://static-01.daraz.com.np/p/41d43bc8c31de6d900494b91074ba468.jpg", 30000, 1),
  //   createData('Redmi note 11', "https://static-01.daraz.com.np/p/1880dffde5a5d6ab0d305e84a560ea4b.jpg", 40000, 10),
  //   createData('Redmi Note A', "https://static-01.daraz.com.np/p/45b20e3df54ee9d7838d66e08a5f1e9e.jpg", 50000, 1),
  //   createData('C20 Nokia', "https://static-01.daraz.com.np/p/73ab8133bddcbb94541389f20cafc078.png", 10000, 1),
  //   createData('POCO M5', "https://static-01.daraz.com.np/p/46071b29181d52534b163462fe413d04.jpg", 50000, 10),
  // ];
  const dispatch = useDispatch()

  const increase_quantity = (id, quantity, stock) => e => {
    e.preventDefault()
    quantity++;
    if (quantity > stock) {
      Swal.fire("Warning", "Quantity out of stock", "warning")
    }
    else {
      dispatch(addItemsToCart(id, quantity))
    }
  }

  const decrease_quantity = (id, quantity) => e => {
    e.preventDefault()
    quantity--
    if (quantity <= 0) {
      Swal.fire({ title: "Warning", html: "Do you want to remove this item?", icon: "warning", showCancelButton: true })
        .then(result => {
          if (result.isConfirmed) {
            dispatch(removeItemFromCart(id))
          }
        })
    }
    else {
      dispatch(addItemsToCart(id, quantity))
    }
  }

  const remove_item = (id) => e => {
    e.preventDefault()
    dispatch(removeItemFromCart(id))
  }
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SNO</TableCell>
                    <TableCell align="right">Product Image</TableCell>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart_items.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, "&:hover": { backgroundColor: "skyblue" }, cursor: "pointer" }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="right"><img src={`${API}/${row.product_image}`} sx={{ height: "10px" }} /></TableCell>
                      <TableCell align="right">

                        <Typography variant="h6">{row.product_name}</Typography>                  </TableCell>


                      <TableCell><Typography variant="h6">{row.product_price}</Typography></TableCell>
                      <TableCell align="right">
                        <div className="btn-group">
                          <button className="btn btn-warning" onClick={decrease_quantity(row.product, row.quantity)}>-</button>
                          <input type="text" value={row.quantity} style={{ border: 0, textAlign: "center", padding: "0 5px", width: "40px" }} readOnly />
                          {row.quantity}
                          <button className="btn btn-success" onClick={increase_quantity(row.product, row.quantity, row.count_in_stock)}>+</button>
                        </div>

                      </TableCell>

                      <TableCell align="center"> <Typography variant="h6"> {row.quantity * row.product_price}</Typography></TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="error" startIcon={<Delete />} endIcon={<Delete />} onClick={remove_item(row.product)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
          <div className='col-md-4 p-5'>
            Order Summary
            <h4>Order Items:{cart_items_number}</h4>
            <h4>Order Total:{order_total}</h4>
            {
              cart_items.length > 0 ?
                <Link to="/shipping" className="btn btn-warning"> Proceed to shipping</Link>
                : <button className='btn btn-warning' disabled >Proceed to shipping</button>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart