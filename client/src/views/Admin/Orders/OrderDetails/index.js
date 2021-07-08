import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TitleWithAction, Button } from '../../../../components'
import { GET_ORDER_DETAILS } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

import './styles.css'

function OrderDetails(props) {

  const [restaurantId, setrestaurantId] = useState(null)
  const [orderNumber, setorderNumber] = useState(null)

  const fetchingOrderDetails = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrderDetails)
  const orderDetails = useSelector(({ ordersReducer }) => ordersReducer.orderDetails)

  const dispatch = useDispatch()

  const { location: { state }, history } = props
  const statuses = {
    P: 'Pending',
    A: 'In-que',
    S: 'Served'
  }

  useEffect(() => {
    if (!state)
      history.push('/')
    else {
      dispatch(customisedAction(GET_ORDER_DETAILS, { restaurantId: state.restaurantId, orderNumber: state.orderNumber }))
      setrestaurantId(state.restaurantId)
      setorderNumber(state.orderNumber)
    }
  }, [])

  return (
    <div className="Container">
      <TitleWithAction
        text={`Check # ${orderNumber}`}
        textAlign="center"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={<Button
          text={fetchingOrderDetails ? "Syncing" : "Refresh"}
          light={fetchingOrderDetails}
          lightAction={() => null}
          iconLeft={<i className={`fa fa-refresh ${fetchingOrderDetails ? 'fa-pulse' : ''}`} />}
          onClick={() => dispatch(customisedAction(GET_ORDER_DETAILS, { restaurantId, orderNumber }))}
        />}
      />
      {fetchingOrderDetails && !orderDetails ?
        <div className="DashBoardContainer">
          <div className="loadingContainer">
            <p><i className={'fa fa-refresh fa-pulse'} style={{ padding: '0px 5px' }} />Syncing Order Details . . .</p>
          </div>
        </div> : null
      }
      {orderDetails ? <>
        <div className="ItemContainer">
          <div className="ItemDetailsContainer">
            <div className="ItemDetailsSections">
              <h4>Item Name:</h4>
              <p>{orderDetails.name}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Quantity:</h4>
              <p>{orderDetails.quantity}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Status:</h4>
              <p>{statuses[0]}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Total Price (including add-ons):</h4>
              <p>$ {orderDetails.totalPrice}</p>
            </div>
          </div>
          <div className="InstructionsContainer">
            <h4>Special Instructions:</h4>
            <div className="InstructionsTextContainer">
              <p>{orderDetails.specialInstructions}</p>
            </div>
          </div>
        </div>
        <div className="ItemDetailsSections">
          <h4>Add-Ons:</h4>
        </div>
      </> : null}
    </div>
  )
}

export default OrderDetails
