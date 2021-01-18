import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { FORGOT_PASSWORD, SET_TOAST_DISMISSING } from '../../constants'

import { DineMateTitle, Title, Input, Button } from '../../components'

import logo from '../../assets/logo.png'

function ForgotPassword(props) {

  const [email, setemail] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="full-screen-container login-screen">
      <div className="login-logo-container">
          <img src={logo} alt="logo" />
          <DineMateTitle />
      </div>
      <div className="login-container">
        <div className="login-title-container">
          <Title text="Forgot Password" />
        </div>
        <div style={{ width: '80%', textAlign: 'center' }}>
          <p>Enter your registered email here</p>
          <p>and you will be sent a link to</p>
          <p style={{ marginBottom: '10px' }}>reset your password</p>
        </div>
        <Input 
          style={{ width: '80%' }}
          placeholder="Enter Email"
          value={email}
          onChange={({ target: { value } }) => setemail(value)}
        />
        <div className="login-button-container">
          <Button
            onClick={() => {
              dispatch(customisedAction(SET_TOAST_DISMISSING, true))
              dispatch(customisedAction(FORGOT_PASSWORD, { email }))
            }}
            text="Submit"
          />
        </div>
        <Link style={{ marginTop: '10px' }} to="/adminLogin">Go to Login ?</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
