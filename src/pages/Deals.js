import { FavoriteBorder, Favorite, Share } from '@mui/icons-material'
import { FormGroup, RadioGroup, Box, Grid, Link, Typography, ListItem, ListItemIcon, FormControlLabel, Checkbox, Radio, CardContent, Card, CardMedia, CardActions, Button } from '@mui/material'
// import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { getAllProducts, getFilteredProducts } from '../api/productAPI.js'
import Cards from '../components/Card'
import CategoryCheckbox from '../components/CategoryCheckbox.js'
import Navbar from '../components/layout/Navbar'
import PricesRadio from '../components/PricesRadio.js'

const Deals = () => {
  const [products, setProducts] = useState([])
  const [myFilter, setMyFilter] = useState({
    filters: {
      category: [],
      product_price: []
    }
  })
  useEffect(() => {
    getFilteredProducts(myFilter)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProducts(data)
        }
      })
  }, [myFilter])

  const handleFilter = (filters, filterBy) => {
    let new_filter = { ...myFilter }
    new_filter.filters[filterBy] = filters
    setMyFilter(new_filter)
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={4}>
        <Grid item xs={3} sx={{ padding: "5" }}>
          <Box p={5}>
            <Typography variant='h4' color="success.main" fontWeight={"bold"} sx={{ textDecoration: "none" }}>Deals</Typography>
            <ListItem><Link href="#"><Typography variant='button' color="secondary" fontSize={20} >Most popular</Typography></Link></ListItem>
            <ListItem> <Link href="#"><Typography variant='button' color="warning" fontSize={20}>Flash sales</Typography></Link></ListItem>
            <ListItem> <Link href="#"><Typography variant='button' color="error" fontSize={20}>Deals of the day</Typography></Link></ListItem>

            <CategoryCheckbox handleCategory={handleFilter} />
            <PricesRadio handlePrice={handleFilter} />
            {/* <Typography variant='h4' color="success.main" fontWeight={"bold"} sx={{ textDecoration: "none" }}>Prices</Typography>


            <RadioGroup>
              <FormControlLabel control=
                {<Radio size="large" color="success" icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="prices" value="0" />}
                label="Upto Rs.10000" />
              <FormControlLabel control={<Radio name="prices" value="1" />} label="Rs.1000 - Rs.10000" />
              <FormControlLabel control={<Radio name="prices" value="2" />} label="Rs.10000 - Rs.100000" />
              <FormControlLabel control={<Radio name="prices" value="3" />} label="Rs.100000 - Rs.1000000" />
              <FormControlLabel control={<Radio name="prices" value="4" />} label="Rs.10000000 - Rs.1000000000" />
            </RadioGroup> */}


          </Box>
        </Grid>
        <Grid item xs={9} padding={5}>
          <Grid container spacing={3}>

            {
              products && products.map(item => {
                return <Grid item xs={4} key={item._id}>
                  <Cards item={item} />
                </Grid>

              })
            }
            {/* 
            <Grid item xs={4}>
              <Cards image="./images/asset 17.jpeg" title="Green iguana" />
            </Grid>


            <Grid item xs={4}>
              <Cards image="./images/asset 18.jpeg" title="Random Name" />
            </Grid>

            <Grid item xs={4}>
              <Cards image="./images/asset 19.jpeg" title="Friend of mine" />
            </Grid>


            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 200 }} image="./images/asset 23.jpeg" title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Acer Laptop
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                    <Button size="small" endIcon={<FavoriteBorder />}>Favorite</Button>
                    <Button size="small"> Learn More<Share /></Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>


            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 200 }} image="./images/asset 23.jpeg" title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Acer Laptop
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                    <Button size="small" endIcon={<FavoriteBorder />}>Favorite</Button>
                    <Button size="small"> Learn More<Share /></Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid> */}





          </Grid>
        </Grid >
      </Grid>
    </>

  )
}

export default Deals

// if container used, doesn't take full width