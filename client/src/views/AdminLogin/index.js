import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_SESSION } from '../../constants/App'

function AdminLogin(props) {

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (admin)
      props.history.replace('/admin')
  }, [admin])

  return (
    <div>
      <p>AdminLogin</p>
      <button onClick={() => dispatch(customisedAction(SET_SESSION, { admin: "Ahad" }))}>Login</button>
    </div>
  )
}

export default AdminLogin
