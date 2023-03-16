import React from 'react'

const Display = (props) => {
  const { name, address, phone } = props;
  return (
    <>
      <h1>Name:{name}</h1>
      <h2>Address:{address}</h2>
      <h3>Phone:{phone}</h3>
    </>
  )
}

export default Display