import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from "react-router-dom";

import { customisedAction } from '../../redux/actions'
import { CREATE_PASSWORD, SET_TOAST_DISMISSING } from '../../constants'

import { DineMateTitle, Title, Input, Button } from '../../components'

import logo from '../../assets/logo.png'

function CreatePassword(props) {
  
  const [password, setpassword] = useState('')

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  let { restaurantId, email, hashString } = useParams();

  useEffect(() => {
    if (admin)
      props.history.replace('/admin')
  }, [admin])

  return (
    <div className="full-screen-container login-screen">
      <div className="login-logo-container">
          <img src={logo} alt="logo" />
          <DineMateTitle />
      </div>
      <div className="login-container">
        <div className="login-title-container">
          <Title text="Create Password" />
        </div>
        <div style={{ width: '80%' }}>
          <h4>Restaurant ID:</h4>
          <p style={{ marginBottom: '10px' }}>{restaurantId}</p>
          <h4>Email:</h4>
          <p style={{ marginBottom: '5px' }}>{email}</p>
        </div>
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
              dispatch(customisedAction(CREATE_PASSWORD, { restaurantId, email, password, hashString }))
            }}
            text="Submit"
          />
        </div>
        <Link style={{ marginTop: '10px' }} to="/adminLogin">Go to Login ?</Link>
      </div>
    </div>
  )
}

export default CreatePassword
