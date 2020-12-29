import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { ADMIN_SIGN_IN } from '../../constants/App'

import { DineMateTitle, Title, Input, Button } from '../../components'

import logo from '../../assets/logo.png'

import './styles.css'

function AdminLogin(props) {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (admin)
      props.history.replace('/admin')
  }, [admin])

  return (
    <div className="full-screen-container login-screen">
      {/* <p>AdminLogin</p>
      <button onClick={() => dispatch(customisedAction(ADMIN_SIGN_IN, { 
        email: 'ahads62426@gmail.com', password: 'ahad1234' 
      }))}>Login</button> */}
      <div className="login-logo-container">
          <img src={logo} alt="logo" />
          <DineMateTitle />
      </div>
      <div className="login-container">
        <div className="login-title-container">
          <Title text="AdminLogin" />
        </div>
        <Input 
          style={{ width: '80%' }}
          placeholder="Enter Email"
          value={email}
          onChange={({ target: { value } }) => setemail(value)}
        />
        <Input 
          style={{ width: '80%' }}
          placeholder="Enter Password"
          value={password}
          onChange={({ target: { value } }) => setpassword(value)}
        />
        <div className="login-button-container">
          <Button
            onClick={() => dispatch(customisedAction(ADMIN_SIGN_IN, { email, password }))}
            text="Login"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
