import React from 'react';
import { Link } from 'react-router-dom';


const Firstpage = () => {

  let style_obj = {
    fontSize: "24px",
    color: "red",
    width: "100%",
    textAlign: "center",
    padding: "10px"
  }
  return (
    <>
      <div>First</div>
      <h1> Hello First.js</h1>
      <input type={'text'}></input>
      <Link to="/second">Go to second page </Link>
      <div className="demo" style={style_obj}>Hello</div>
      <p> hello world</p>

      <div className="container bg-primary p-5 h2">Hello World Bootstrap</div>
    </>
  )
}

export default Firstpage