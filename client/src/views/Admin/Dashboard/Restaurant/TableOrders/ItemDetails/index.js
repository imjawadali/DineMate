import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TitleWithAction, Button } from '../../../../../../components'
import { GET_ORDER_ITEM_DETAILS } from '../../../../../../constants'
import { customisedAction } from '../../../../../../redux/actions'

import AddOnsList from './AddOnsList'
import './styles.css'

function ItemDetails(props) {

  const [restaurantId, setrestaurantId] = useState(null)
  const [id, setid] = useState(null)
  const [orderNumber, setorderNumber] = useState(null)

  const fetchingOrderItemDetails = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrderItemDetails)
  const orderItemDetails = useSelector(({ ordersReducer }) => ordersReducer.orderItemDetails)

  const dispatch = useDispatch()

  const { location: { state }, history } = props
  const statuses = {
    P: 'Pending',
    R: 'Ready',
    S: 'Served'
  }

  useEffect(() => {
    if (!state)
      history.push('/')
    else {
      dispatch(customisedAction(GET_ORDER_ITEM_DETAILS, { restaurantId: state.restaurantId, id: state.id }))
      setrestaurantId(state.restaurantId)
      setid(state.id)
      setorderNumber(state.orderNumber)
    }
  }, [])

  return (
    <div className="Container">
      <TitleWithAction
        text={`Check - ${orderNumber}`}
        textAlign="center"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={<Button
          text={fetchingOrderItemDetails ? "Syncing" : "Refresh"}
          light={fetchingOrderItemDetails}
          lightAction={() => null}
          iconLeft={<i className={`fa fa-refresh ${fetchingOrderItemDetails ? 'fa-pulse' : ''}`} />}
          onClick={() => dispatch(customisedAction(GET_ORDER_ITEM_DETAILS, { restaurantId, id }))}
        />}
      />
      {fetchingOrderItemDetails && !orderItemDetails ?
        <div className="DashBoardContainer">
          <div className="loadingContainer">
            <p><i className={`fa fa-refresh ${fetchingOrderItemDetails ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Item Details . . .</p>
          </div>
        </div> : null
      }
      {orderItemDetails ? <>
        <div className="ItemContainer">
          <div className="ItemDetailsContainer">
            <div className="ItemDetailsSections">
              <h4>Item Name:</h4>
              <p>{orderItemDetails.name}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Quantity:</h4>
              <p>{orderItemDetails.quantity}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Status:</h4>
              <p>{statuses[orderItemDetails.status]}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Item Price:</h4>
              <p>$ {(orderItemDetails.price).toFixed(2)}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Total Price (including add-ons):</h4>
              <p>$ {(orderItemDetails.totalPrice).toFixed(2)}</p>
            </div>
          </div>
          <div className="InstructionsContainer">
            <h4>Special Instructions:</h4>
            <div className="InstructionsTextContainer">
              <p>{orderItemDetails.specialInstructions}</p>
            </div>
          </div>
        </div>
        <div className="ItemDetailsSections">
          <h4>Add-Ons:</h4>
        </div>
        <div className="TabularContentContainer" style={{ marginTop: '0px' }}>
          <AddOnsList
            itemName={orderItemDetails.name}
            quantity={orderItemDetails.quantity}
            itemPrice={orderItemDetails.price}
            itemTotalPrice={orderItemDetails.totalPrice}
            addOns={JSON.parse(orderItemDetails.addOns)} />
        </div>
      </> : null}
    </div>
  )
}

export default ItemDetails
