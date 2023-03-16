import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { prices } from "./prices.js"

const PricesRadio = ({ handlePrice }) => {
  const handleChange = id => e => {
    let new_price = prices.find(item => item.id == id)
    handlePrice(new_price.value, "product_price")
  }
  return (
    <div>
      <Typography variant='h4' color="success.main" fontWeight={"bold"} sx={{ textDecoration: "none" }}>Prices</Typography>


      <RadioGroup>
        {
          prices.map(price => {
            return <FormControlLabel control=
              {<Radio size="large" color="success" icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="prices" value={price.id} onChange={handleChange(price.id)} />
              } label={price.title}
            />
          })}

      </RadioGroup>
    </div>
  )
}

export default PricesRadio