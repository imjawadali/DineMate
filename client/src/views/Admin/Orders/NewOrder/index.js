import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DropDown, TitleWithAction, Button, MenuGridItem } from '../../../../components'
import { customisedAction } from '../../../../redux/actions'

import Add_EditItem from './Add_EditItem'
import CartItemsList from './CartItemsList'
import './styles.css'

function NewOrder(props) {

  const [type, settype] = useState('')
  const [table, settable] = useState('')
  const [selectedItem, setselectedItem] = useState(null)
  const [itemToEdit, setitemToEdit] = useState(null)
  const [indexOfItemToEdit, setindexOfItemToEdit] = useState(null)
  const [addingEdittingItem, setaddingEdittingItem] = useState(false)
  const [cart, setcart] = useState([])
  const [existingOrder, setexistingOrder] = useState(null)
  const [showCart, setshowCart] = useState(false)

  const tables = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId, taxPercentage } = admin
  const { location: { state }, history } = props

  useEffect(() => {
    if (state && state.orderDetails) {
      setexistingOrder(state.orderDetails)
    }
  }, [])

  const editItem = (item, index) => {
    setitemToEdit(item)
    setindexOfItemToEdit(index)
    showAddOnModal(menu.filter(x => x.id === item.id)[0])
  }

  const deleteItem = (index) => {
    const tempCartItems = [ ...cart ]
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

  const submitItem = async (item) => {
    let tempCartItems = cart
    tempCartItems.push(item)
    setcart(tempCartItems)
    cancelModal()
  }

  const updateItem = async (item) => {
    let tempCartItems = cart
    tempCartItems[indexOfItemToEdit] = item
    setcart(tempCartItems)
    cancelModal()
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
        text={existingOrder ? `Existing Order (${existingOrder.orderNumber})` : "New Order"}
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={
          <div style={{ display: 'flex' }}>
            <div>
              <DropDown
                style={{ marginTop: '0px', marginBottom: '0px' }}
                placeholder="Select Order Type"
                options={['Dine-In', 'Take-Away']}
                disabled={!!existingOrder}
                value={existingOrder ? existingOrder.type : type}
                onChange={({ target: { value } }) => settype(value)}
              />
            </div>
            {type === 'Dine-In' ?
              <div>
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
              iconLeft={<i className={`fa fa-eye`} />}
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
                onClick={() => setshowCart(false)}>
                <td style={{ color: 'white', padding: '0px' }}>Add More</td>
              </div>
              <div className="OrderDetailsBottomButtons"
                style={{ opacity: 0.5 }}
                onClick={() => null}>
                <td style={{ color: 'white', padding: '0px' }}>Submit</td>
              </div>
              <div className="OrderDetailsBottomButtons"
                onClick={() => {
                  cancel()
                  history.goBack()
                }}>
                <td style={{ color: 'white', padding: '0px' }}>Cancel</td>
              </div>
            </div>
          </div>
        </>
        :
        <div className="NewOrderMenuContainer">
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
