import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function SideBar(props) {

  let { url } = useRouteMatch();

  return (
    <div>
      <p>SideBar</p>
      <Link to={`${url}`}>Dashboard</Link>
      <Link to={`${url}/others`}>Others</Link>
      <hr />
      <hr />
    </div>
  )
}

export default SideBar
