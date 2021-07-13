import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TitleWithAction, Button, OrderTimer } from '../../../../components'
import { CLOSE_ORDER, GET_ORDER_DETAILS } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'
import { getFormatedDateTime } from '../../../../helpers'

import ItemsList from './ItemsList'
import './styles.css'

function OrderDetails(props) {

  const [restaurantId, setrestaurantId] = useState(null)
  const [orderNumber, setorderNumber] = useState(null)

  const fetchingOrderDetails = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrderDetails)
  const orderDetails = useSelector(({ ordersReducer }) => ordersReducer.orderDetails)
  const closingId = useSelector(({ ordersReducer }) => ordersReducer.closingId)

  const dispatch = useDispatch()

  const { location: { state }, history } = props

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
            <p><i className={'fa fa-refresh fa-pulse'} style={{ padding: '0px 5px' }} />Syncing Check Details . . .</p>
          </div>
        </div> : null
      }
      {orderDetails ? <>
        <div className="OrderDetailsContainer">
          <div className="OrderDetailsSection">
            <div className="OrderDetailsLabel">
              <p className="OrderDetailsText">Check Opened:</p>
              <p className="OrderDetailsText">Duration:</p>
            </div>
            <div className="OrderDetailsData">
              <p className="OrderDetailsText">{getFormatedDateTime(orderDetails.createdAt)}</p>
              <OrderTimer status={orderDetails.status} timeStamp={orderDetails.duration} textOnly />
            </div>
          </div>
          <div className="OrderDetailsSectionMiddle"></div>
          <div className="OrderDetailsSection">
            <div className="OrderDetailsLabel">
              <p className="OrderDetailsText">Check Closed:</p>
              <p className="OrderDetailsText">Status:</p>
            </div>
            <div className="OrderDetailsData">
              <p className="OrderDetailsText">{!orderDetails.status ? getFormatedDateTime(orderDetails.closedAt) : '-'}</p>
              <p className="OrderDetailsText" style={{ color: orderDetails.status ? 'green' : 'red' }}>{orderDetails.status ? "Open" : "Closed"}</p>
            </div>
          </div>
        </div>
        <ItemsList orderDetails={orderDetails} items={orderDetails.items} />
        <div className="OrderDetailsBottomButtonsContainer">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}
              onClick={() => {
                if (orderDetails.status && closingId !== orderNumber) {
                  history.push({
                    pathname: '/client/admin/ordersManagement/newOrder', state: {
                      orderDetails: { ...orderDetails, orderNumber }
                    }
                  })
                }
              }}>
              <td style={{ color: 'white', padding: '0px' }}>Add Item</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}>
              <td style={{ color: 'white', padding: '0px' }}>Discount</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}>
              <td style={{ color: 'white', padding: '0px' }}>Split</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}>
              <td style={{ color: 'white', padding: '0px' }}>Void</td>
            </div>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}>
              <td style={{ color: 'white', padding: '0px' }}>Cash</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{ opacity: !orderDetails.status || closingId === orderNumber ? 0.5 : '' }}
              onClick={() => orderDetails.status && closingId !== orderNumber ?
                dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber }))
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Close</td>
            </div>
            <div className="OrderDetailsBottomButtons">
              <td style={{ color: 'white', padding: '0px' }}>Print</td>
            </div>
          </div>
        </div>
      </> : null}
    </div>
  )
}

export default OrderDetails