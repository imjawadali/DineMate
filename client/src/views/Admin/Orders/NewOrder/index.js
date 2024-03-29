import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DropDown, TitleWithAction, Button, MenuGridItem } from '../../../../components'
import { GET_MENU, SUBMIT_NEW_ORDER, ADD_ITEMS_TO_ORDER, SET_TOAST, GET_RESTAURANT_SETTINGS } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

import Add_EditItem from './Add_EditItem'
import CartItemsList from './CartItemsList'
import './styles.css'

function NewOrder(props) {

  const [taxPercentage, settaxPercentage] = useState(0)
  const [type, settype] = useState('')
  const [table, settable] = useState('')
  const [selectedItem, setselectedItem] = useState(null)
  const [itemToEdit, setitemToEdit] = useState(null)
  const [indexOfItemToEdit, setindexOfItemToEdit] = useState(null)
  const [addingEdittingItem, setaddingEdittingItem] = useState(false)
  const [cart, setcart] = useState([])
  const [existingOrder, setexistingOrder] = useState(null)
  const [showCart, setshowCart] = useState(false)

  const addingUpdatingOrder = useSelector(({ ordersReducer }) => ordersReducer.addingUpdatingOrder)
  const tables = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingRestaurantSettings = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingRestaurantSettings)
  const restaurantSettings = useSelector(({ restaurantReducer }) => restaurantReducer.restaurantSettings)
  const dispatch = useDispatch()

  const { restaurantId } = admin
  const { location: { state }, history } = props

  useEffect(() => {
    if (state && state.orderDetails) {
      setexistingOrder(state.orderDetails)
    }

    if (!fetchingMenu && !menu) dispatch(customisedAction(GET_MENU, { restaurantId }))

    if (!fetchingRestaurantSettings && !restaurantSettings)
      dispatch(customisedAction(GET_RESTAURANT_SETTINGS, { restaurantId }))
  }, [])

  useEffect(() => {
    if (restaurantSettings && restaurantSettings.taxPercentage)
      settaxPercentage(restaurantSettings.taxPercentage)
  }, [restaurantSettings])

  const editItem = (item, index) => {
    setitemToEdit(item)
    setindexOfItemToEdit(index)
    showAddOnModal(menu.filter(x => x.id === item.itemId)[0])
  }

  const deleteItem = (index) => {
    const tempCartItems = [...cart]
    tempCartItems.splice(index, 1)
    setcart(tempCartItems)
    if (!tempCartItems.length) {
      cancel()
    }
  }

  const cancel = () => {
    setshowCart(false)
    setcart([])
  }

  const showAddOnModal = (item) => {
    setselectedItem(item)
    setaddingEdittingItem(true)
  }

  const cancelModal = () => {
    setselectedItem(null)
    setitemToEdit(null)
    setindexOfItemToEdit(null)
    setaddingEdittingItem(false)
  }

  const submitItem = (item) => {
    let tempCartItems = cart
    tempCartItems.push(item)
    setcart(tempCartItems)
    cancelModal()
  }

  const updateItem = (item) => {
    let tempCartItems = cart
    tempCartItems[indexOfItemToEdit] = item
    setcart(tempCartItems)
    cancelModal()
  }

  const disabled = () => {
    if (!existingOrder && !type) return "Order type is required"
    if (!existingOrder && type === 'Dine-In' && !table) return "Table number is required"
    if (!cart || !cart.length) return "No items added to cart"
    return false
  }

  const submitNewOrder = () => {
    const payload = {
      restaurantId,
      type,
      items: cart
    }
    if (type === 'Dine-In') {
      payload.tableId = table.replace('Table # ', '')
    }
    dispatch(customisedAction(SUBMIT_NEW_ORDER, payload, { history }))
  }

  const addItemsToOrder = () => {
    const payload = {
      restaurantId,
      orderNumber: existingOrder.orderNumber,
      items: cart
    }
    dispatch(customisedAction(ADD_ITEMS_TO_ORDER, payload, { history }))
  }

  return (
    <div className="Container">
      <Add_EditItem
        addingEdittingItem={addingEdittingItem}
        item={selectedItem}
        itemToEdit={itemToEdit}
        submitItem={submitItem}
        updateItem={updateItem}
        cancelModal={cancelModal}
      />
      <TitleWithAction
        text={existingOrder ? `Existing Check (${existingOrder.orderNumber})` : "New Check"}
        icon={showCart ? null : <i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={
          <div style={{ display: 'flex' }}>
            <div>
              <DropDown
                style={{ marginTop: '0px', marginBottom: '0px' }}
                placeholder="Select Check Type"
                options={['Dine-In', 'Take-Away']}
                disabled={!!existingOrder}
                value={existingOrder ? existingOrder.type : type}
                onChange={({ target: { value } }) => settype(value)}
              />
            </div>
            {type === 'Dine-In' ?
              <div style={{ marginLeft: '10px' }}>
                <DropDown
                  style={{ marginTop: '0px', marginBottom: '0px' }}
                  placeholder="Select Table"
                  options={tables && tables.length ?
                    tables.map(table => `Table # ${table.value}`)
                    : []}
                  value={table}
                  onChange={({ target: { value } }) => settable(value)}
                />
              </div>
              : null}
            <Button
              style={{ marginLeft: '10px' }}
              text="View"
              light={(!cart || !cart.length || showCart) && (!existingOrder || showCart)}
              lightAction={() => null}
              onClick={() => setshowCart(true)} />
          </div>
        }
      />
      {showCart ?
        <>
          <CartItemsList items={cart} taxPercentage={taxPercentage} existingOrder={existingOrder} editItem={editItem} deleteItem={deleteItem} />
          <div className="OrderDetailsBottomButtonsContainer">
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              <div className="OrderDetailsBottomButtons"
                style={{ opacity: addingUpdatingOrder ? 0.5 : '' }}
                onClick={() => addingUpdatingOrder ? null : setshowCart(false)}>
                <td style={{ color: 'white', padding: '0px' }}>Add more</td>
              </div>
              <div className="OrderDetailsBottomButtons"
                style={{ opacity: !!disabled() || addingUpdatingOrder ? 0.5 : '' }}
                onClick={() => !disabled() && !addingUpdatingOrder ?
                  existingOrder ? addItemsToOrder() : submitNewOrder()
                  : addingUpdatingOrder ? null
                    : dispatch(customisedAction(SET_TOAST, { message: disabled(), type: 'error' }))
                }>
                <td style={{ color: 'white', padding: '0px' }}>Submit</td>
              </div>
              <div className="OrderDetailsBottomButtons"
                style={{ opacity: addingUpdatingOrder ? 0.5 : '' }}
                onClick={() => {
                  if (!addingUpdatingOrder) {
                    cancel()
                    history.goBack()
                  }
                }}>
                <td style={{ color: 'white', padding: '0px' }}>Cancel</td>
              </div>
            </div>
          </div>
        </>
        :
        <div className="NewOrderMenuContainer">
          <i className={`fa fa-refresh ${fetchingMenu ? 'fa-pulse' : ''} fa-lg`}
            style={{ position: 'absolute', right: 10, opacity: fetchingMenu ? 0.5 : '', zIndex: 1, cursor: 'pointer' }}
            onClick={() => fetchingMenu ? null : dispatch(customisedAction(GET_MENU, { restaurantId }))}
          />
          {!menu ?
            <div className="DashBoardContainer">
              <div className="loadingContainer">
                {fetchingMenu ?
                  <p><i className={'fa fa-refresh fa-pulse'} style={{ padding: '0px 5px' }} />Fetching / Syncing Menu . . .</p>
                  : <p>No Items in Menu</p>
                }
              </div>
            </div>
            : fetchingMenu ?
              <div className="loadingContainer">
                <p><i className={'fa fa-refresh fa-pulse'} style={{ padding: '0px 5px' }} />Fetching / Syncing Menu . . .</p>
              </div>
              : null
          }
          {menu && menu.length ?
            <div className="NewOrderMenuGrids">
              {menu.map(item => {
                const { id, name, shortDescription, price } = item
                return (
                  <div key={id} className="DashboardGridItemContainer">
                    <MenuGridItem
                      name={name}
                      shortDescription={shortDescription}
                      price={price}
                      onClick={() => showAddOnModal(item)}
                    />
                  </div>
                )
              })}
            </div>
            : null
          }
        </div>
      }
    </div>
  )
}

export default NewOrder
