import React from 'react'
import { Link } from 'react-router-dom'

function Others(props) {
  return (
    <div>
      <p>Others</p>
      <Link to="/customer/restaurants">Restaurants</Link>
      <br />
      <Link to="/client" target="blank" >Admin</Link>
    </div>
  )
}

export default Others