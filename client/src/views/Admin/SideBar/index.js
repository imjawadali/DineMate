import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch, withRouter } from 'react-router-dom'

import { customisedAction } from '../../../redux/actions'
import { ADMIN_LOGOUT } from '../../../constants'
import { removeItem } from '../../../helpers'

function SideBar(props) {

  const dispatch = useDispatch()

  let { url } = useRouteMatch();

  return (
    <div>
      <p>SideBar</p>
      <button onClick={async () => props.history.push('/')}>Home</button>
      <button onClick={async () => {
        removeItem('admin')
        dispatch(customisedAction(ADMIN_LOGOUT))
      }}>Logout</button>
      <Link to={`${url}`}>Dashboard</Link>
      <Link to={`${url}/others`}>Others</Link>
      <hr />
      <hr />
    </div>
  )
}

export default withRouter(SideBar)
