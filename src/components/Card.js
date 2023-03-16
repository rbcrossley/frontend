import { FavoriteBorder, Share } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { API } from '../config.js'

const Cards = ({ item }) => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <img style={{ width: "100 %", height: "200px" }} src={`${API}/${item.product_image}`} alt={item.product_image} title={item.product_name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.product_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {item.product_price}
          </Typography>
        </CardContent>
        <CardActions>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Button size="small" endIcon={<FavoriteBorder />}>Favorite</Button>
            <Link to={`/product/${item._id}`}>
              <Button size="small">View Details<Share /></Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </div>
  )
}

export default Cards