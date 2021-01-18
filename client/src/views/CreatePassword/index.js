import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import { customisedAction } from '../../redux/actions'
import { CREATE_PASSWORD, SET_TOAST_DISMISSING } from '../../constants'

import { DineMateTitle, Title, Input, Button } from '../../components'

import logo from '../../assets/logo.png'

import './styles.css'

function CreatePassword(props) {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  let { restaurantId, adminEmail } = useParams();

  useEffect(() => {
    setemail(adminEmail)
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
          <p style={{ marginBottom: '5px' }}>{adminEmail}</p>
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
              dispatch(customisedAction(CREATE_PASSWORD, { restaurantId, email, password }))
            }}
            text="Submit"
          />
        </div>
      </div>
    </div>
  )
}

export default CreatePassword
