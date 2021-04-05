import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { ADMIN_SIGN_IN, SET_TOAST_DISMISSING } from '../../constants'

import { DineMateTitle, Title, Input, Button } from '../../components'

import logo from '../../assets/logo.png'

import './styles.css'

function AdminLogin() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="full-screen-container login-screen">
      <div className="login-logo-container">
          <img src={logo} alt="logo" />
          <DineMateTitle />
      </div>
      <div className="login-container">
        <div className="login-title-container">
          <Title text="Admin Login" />
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
            onClick={() => {
              dispatch(customisedAction(SET_TOAST_DISMISSING, true))
              dispatch(customisedAction(ADMIN_SIGN_IN, { email, password }))
            }}
            text="Login"
          />
        </div>
        <Link style={{ marginTop: '10px' }} to="/client/forgotPassword">Forgot Password ?</Link>
      </div>
    </div>
  )
}

export default AdminLogin
