import { Box, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import Navbar from '../components/layout/Navbar'

const Contact = () => {
  return (
    <div>
      <Navbar />
      <Box display={"flex"} padding="25px" sx={{ backgroundColor: "aliceblue" }}>
        <Box width={"50%"} padding="25px" borderRadius="10px">


          <Typography variant='h5'>Contact Form</Typography>
          <TextField label="email" placeholder='enter email here' fullWidth required></TextField>
          <TextField label="subject" placeholder='enter subject' fullWidth required ></TextField>
          <TextField label="body" placeholder='enter email here' fullWidth required multiline maxRows={3} minRows={3}></TextField>
          <Button variant="contained" fullwidth>Submit</Button>
        </Box >
        <Box width={"50%"}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3794981426213!2d85.3322217150153!3d27.705566782792655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199ffe9d7c6b%3A0x91b3a969f305a0bc!2sMaitidevi%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1672741075140!5m2!1sen!2snp" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></Box>
      </Box >
    </div >


  )
}

export default Contact