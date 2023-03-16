import { FavoriteBorder } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categoryAPI.js'

const CategoryCheckbox = ({ handleCategory }) => {
  const [checked, setChecked] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setCategories(data)
        }
      })
  })

  const handleChange = (id) => e => {
    let new_checked = [...checked]
    let new_selected = new_checked.findIndex(item => item === id)
    if (new_selected === -1) {
      new_checked.push(id)
    }
    else {
      new_checked.splice(new_selected, 1)
    }
    setChecked(new_checked)
    handleCategory(new_checked, "category")
  }
  return (
    <><Typography variant='h4' color="success.main" fontWeight={"bold"} sx={{ textDecoration: "none" }}>Departments</Typography>

      <FormGroup>
        {
          categories && categories.map(category => {
            return <FormControlLabel control={<Checkbox size="large" color="success" icon={<FavoriteBorder />} />} label={category.category_name} onChange={handleChange(category._id,)} />
          })
        }

        {/* <FormControlLabel control={<Checkbox />} label="Laptops" />
        <FormControlLabel control={<Checkbox />} label="Fitness" />
        <FormControlLabel control={<Checkbox />} label="Home" />
        <FormControlLabel control={<Checkbox />} label="Furniture" /> */}
      </FormGroup></>
  )
}

export default CategoryCheckbox