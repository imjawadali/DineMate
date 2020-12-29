import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { ADMIN_SIGN_IN } from '../../constants/App'

function AdminLogin(props) {

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (admin)
      props.history.replace('/admin')
  }, [admin])

  return (
    <div className="full-screen-container">
      <p>AdminLogin</p>
      <button onClick={() => dispatch(customisedAction(ADMIN_SIGN_IN, { 
        email: 'ahads62426@gmail.com', password: 'ahad1234' 
      }))}>Login</button>
    </div>
  )
}

export default AdminLogin
