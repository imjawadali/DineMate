import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TitleWithAction, Button, OrderTimer } from '../../../../components'
import { APPLY_DISCOUNT, CLOSE_ORDER, DELETE_ORDER, EDIT_ITEM, GENERATE_RECEIPT, GET_MENU, GET_ORDER_DETAILS, SET_TOAST } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'
import { getFormatedDateTime } from '../../../../helpers'

import EditOrderItem from './EditOrderItem'
import Discount from './Discount'
import ItemsList from './ItemsList'
import './styles.css'

function OrderDetails(props) {

  const [restaurantId, setrestaurantId] = useState(null)
  const [orderNumber, setorderNumber] = useState(null)
  const [edittingItem, setedittingItem] = useState(false)
  const [selectedItem, setselectedItem] = useState(null)
  const [itemToEdit, setitemToEdit] = useState(null)
  const [showDiscountModal, setshowDiscountModal] = useState(false)

  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const fetchingOrderDetails = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrderDetails)
  const orderDetails = useSelector(({ ordersReducer }) => ordersReducer.orderDetails)
  const closingId = useSelector(({ ordersReducer }) => ordersReducer.closingId)
  const deletingItemId = useSelector(({ ordersReducer }) => ordersReducer.deletingItemId)
  const edittingItemId = useSelector(({ ordersReducer }) => ordersReducer.edittingItemId)
  const deletingOrder = useSelector(({ ordersReducer }) => ordersReducer.deletingOrder)
  const applyingDiscount = useSelector(({ ordersReducer }) => ordersReducer.applyingDiscount)
  const generatingReceipt = useSelector(({ ordersReducer }) => ordersReducer.generatingReceipt)
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state)
      history.push('/')
    else {
      dispatch(customisedAction(GET_ORDER_DETAILS, { restaurantId: state.restaurantId, orderNumber: state.orderNumber }))
      setrestaurantId(state.restaurantId)
      setorderNumber(state.orderNumber)

      if (!fetchingMenu && !menu) dispatch(customisedAction(GET_MENU, { restaurantId }))
    }
  }, [])

  const showAddOnModal = (item) => {
    setitemToEdit(item)
    setselectedItem(menu ? menu.filter(x => x.id === item.itemId)[0] : undefined)
    setedittingItem(true)
  }

  const cancelModal = () => {
    setitemToEdit(null)
    setselectedItem(null)
    setedittingItem(false)
  }

  const submitItem = (item) => {
    cancelModal()
    dispatch(customisedAction(EDIT_ITEM, { ...item, restaurantId, orderNumber }))
  }

  const cancelDiscountModal = () => {
    setshowDiscountModal(false)
  }

  const applyDiscount = (discount, discountType) => {
    dispatch(customisedAction(APPLY_DISCOUNT, {
      restaurantId,
      orderNumber,
      discount,
      discountType
    }))
    cancelDiscountModal()
  }

  return (
    <div className="Container">
      <EditOrderItem
        edittingItem={edittingItem}
        item={selectedItem}
        itemToEdit={itemToEdit}
        submitItem={submitItem}
        cancelModal={cancelModal}
      />
      <Discount
        showDiscountModal={showDiscountModal}
        applyDiscount={applyDiscount}
        cancelDiscountModal={cancelDiscountModal}
      />
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
              <p className="OrderDetailsText">Status:</p>
              <p className="OrderDetailsText">{!orderDetails.status ? 'Check Closed:' : ''}</p>
            </div>
            <div className="OrderDetailsData">
              <p className="OrderDetailsText" style={{ color: orderDetails.status ? (orderDetails.type === "Dine-In" && orderDetails.customerStatus) || (orderDetails.type !== "Dine-In" && orderDetails.ready) ? 'blue' : 'green' : 'red' }}>{orderDetails.status ? (orderDetails.type === "Dine-In" && orderDetails.customerStatus) || (orderDetails.type !== "Dine-In" && orderDetails.ready) ? "Ready to close" : "Open" : "Closed"}</p>
              <p className="OrderDetailsText">{!orderDetails.status ? getFormatedDateTime(orderDetails.closedAt) : ''}</p>
            </div>
          </div>
        </div>
        <ItemsList
          orderDetails={orderDetails}
          items={orderDetails.items}
          restaurantId={restaurantId}
          orderNumber={orderNumber}
          showAddOnModal={(item) => showAddOnModal(item)}
          history={history}
        />
        <div className="OrderDetailsBottomButtonsContainer">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || !orderDetails.status
                  || closingId === orderNumber
                  || deletingItemId
                  || edittingItemId
                  || deletingOrder
                  || applyingDiscount ?
                  0.5 : ''
              }}
              onClick={() => !fetchingOrderDetails && orderDetails.status && closingId !== orderNumber && !deletingItemId && !edittingItemId && !deletingOrder && !applyingDiscount ?
                history.push({
                  pathname: '/client/admin/ordersManagement/newOrder', state: {
                    orderDetails: { ...orderDetails, orderNumber }
                  }
                })
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Add Item</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || !orderDetails.status
                  || closingId === orderNumber
                  || deletingItemId
                  || edittingItemId
                  || deletingOrder
                  || applyingDiscount ?
                  0.5 : ''
              }}
              onClick={() => !fetchingOrderDetails && orderDetails.status && closingId !== orderNumber && !deletingItemId && !edittingItemId && !deletingOrder && !applyingDiscount ?
                setshowDiscountModal(true)
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Discount</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || !orderDetails.status
                  || closingId === orderNumber
                  || deletingItemId
                  || edittingItemId
                  || deletingOrder
                  || applyingDiscount ?
                  0.5 : ''
              }}>
              <td style={{ color: 'white', padding: '0px' }}>Split</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || !orderDetails.status
                  || closingId === orderNumber
                  || deletingItemId
                  || deletingOrder
                  || applyingDiscount?
                  0.5 : ''
              }}
              onClick={() => !fetchingOrderDetails && orderDetails.status && closingId !== orderNumber && !deletingItemId && !edittingItemId && !deletingOrder && !applyingDiscount ?
                dispatch(customisedAction(DELETE_ORDER, { restaurantId, orderNumber }, { history }))
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Void</td>
            </div>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || closingId === orderNumber
                  || deletingItemId
                  || edittingItemId
                  || deletingOrder
                  || applyingDiscount ?
                  0.5 : ''
              }}
              onClick={() => !fetchingOrderDetails && closingId !== orderNumber && !deletingItemId && !edittingItemId && !deletingOrder && !applyingDiscount ?
                history.goBack()
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Back</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: fetchingOrderDetails
                  || !orderDetails.status
                  || closingId === orderNumber
                  || deletingItemId
                  || edittingItemId
                  || deletingOrder
                  || applyingDiscount ?
                  0.5 : ''
              }}
              onClick={() => !fetchingOrderDetails && orderDetails.status && closingId !== orderNumber && !deletingItemId && !edittingItemId && !deletingOrder && !applyingDiscount ?
                dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber }))
                : null
              }>
              <td style={{ color: 'white', padding: '0px' }}>Cash</td>
            </div>
            <div className="OrderDetailsBottomButtons"
              style={{
                opacity: orderDetails.status || generatingReceipt ? 0.5 : ''
              }}
              onClick={() => generatingReceipt ? null : orderDetails.status
                ? dispatch(customisedAction(SET_TOAST, { message: 'Close this order first!', type: 'warning'}))
                : dispatch(customisedAction(GENERATE_RECEIPT, { restaurantId, orderNumber }))}>
              <td style={{ color: 'white', padding: '0px' }}>Receipt</td>
            </div>
          </div>
        </div>
      </> : null}
    </div>
  )
}

export default OrderDetails
