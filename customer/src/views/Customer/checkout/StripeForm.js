import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import { useDispatch } from "react-redux"

import { customisedAction } from '../../../redux/actions'
import { CLOSE_ORDER_VIA_STRIPE, SET_TOAST } from '../../../constants'
import './stripe.scss'

function StripeForm({ orderDetails, billAmount, stripe, email }) {

  const [tip, setTip] = React.useState('')
  const dispatch = useDispatch()

  async function getMembership(event) {
    event.preventDefault()

    const { error, token } = await stripe.createToken()

    if (error)
      dispatch(customisedAction(SET_TOAST, { message: error.message, type: 'error' }))
    else if (token) {
      dispatch(customisedAction(CLOSE_ORDER_VIA_STRIPE, {
        restaurantId: orderDetails.restaurantId,
        orderNumber: orderDetails.orderNumber,
        type: orderDetails.type,
        tip,
        billAmount,
        token: token.id,
        email
      }))
    }
  }

  return (
    <form className="stripe-form" onSubmit={(event) => getMembership(event)}>
      <label>
        Card details
        <CardNumberElement />
      </label>
      <label>
        Expiration date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCVCElement />
      </label>
      <h2 style={{ marginBottom: '10px', color: '#828181' }}>
        <span style={{ color: '#ef6e6c', marginRight: '5px' }}>Payment Amount</span>
        ${(Number(billAmount) + Number(tip)).toFixed(2)}
      </h2>
      <label>
        Enter Tip Here
        <input
          style={{
            border: '1px solid #ef6e6c',
          }}
          placeholder="1.00 ($)"
          type="number"
          value={tip}
          onChange={({ target: { value } }) => setTip(value)} />
      </label>
      <button className="payBtn" style={{ width: '100%' }} type="submit">Pay Now</button>
    </form>
  )
}

export default injectStripe(StripeForm)
