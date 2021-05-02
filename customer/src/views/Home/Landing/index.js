import React from 'react'
import { Link } from 'react-router-dom'

function Landing(props) {
  return (
    <div>
      <p>Home</p>
      <Link to="/customer/restaurants">Restaurants</Link>
      <br />
      <Link to="/client" target="blank" >Admin</Link>
    </div>
  )
}

export default Landing
