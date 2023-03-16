import React from 'react'
import Carousel from '../components/Carousel'
import Categories from '../components/Categories'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Categories />
    </>
  )
}

export default Home