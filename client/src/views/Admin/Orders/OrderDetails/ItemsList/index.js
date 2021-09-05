import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_TABLE_ORDERS, DELETE_ITEM, SET_TOAST } from '../../../../../constants'
import { customisedAction } from '../../../../../redux/actions'

function ItemsList(props) {

    const deletingItemId = useSelector(({ ordersReducer }) => ordersReducer.deletingItemId)
    const deletingOrder = useSelector(({ ordersReducer }) => ordersReducer.deletingOrder)
    const closingId = useSelector(({ ordersReducer }) => ordersReducer.closingId)
    const dispatch = useDispatch()

    const { items, orderDetails, restaurantId, orderNumber, showAddOnModal, history } = props

    return (
        <div className="TableDataContainer">
            <table >
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Quantity</th>
                        <th />
                        <th>Item</th>
                        <th style={{ textAlign: 'end' }}>Amount</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length ?
                        items.map((item) => {
                            const { id, quantity, name, totalPrice, status, splitted, vanished, specialInstructions, addOns } = item
                            const addOnsArray = addOns ? JSON.parse(addOns) : null
                            return (<>
                                <tr key={id}
                                    style={{
                                        textDecorationLine: vanished ? 'line-through' : '',
                                        opacity: !orderDetails.status
                                            || deletingItemId === id
                                            || deletingOrder
                                            || closingId
                                            || vanished ? 0.5 : ''
                                    }}>
                                    <td style={{ textAlign: 'center' }}>{quantity}</td>
                                    <td>x</td>
                                    <td style={{ width: '30vw' }}>
                                        <p>{name}</p>
                                        <p>{addOnsArray && addOnsArray.length ?
                                            addOnsArray.map((addon, index) => {
                                                return (`
                                                    ${addon.addOnOption && addon.addOnOption !== 'null' ?
                                                        addon.addOnOption : addon.addOnName}
                                                    ${addon.price ? '(' + addon.price.toFixed(2) + ' $)' : ''}
                                                    ${index !== addOnsArray.length - 1 ? ',' : ''}
                                                `)
                                            })
                                            : null}</p>
                                        <p style={{ color: 'red' }}>{specialInstructions}</p>
                                    </td>
                                    <td style={{ textAlign: 'end' }}>{totalPrice.toFixed(2)} $</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(180, 198, 231)' }}
                                                onClick={() => orderDetails.status && deletingItemId !== id && !deletingOrder && !closingId && !vanished ?
                                                    status === 'P' ?
                                                        showAddOnModal({ ...item, addOns: addOnsArray })
                                                        : dispatch(customisedAction(SET_TOAST, {
                                                            message:
                                                                splitted ?
                                                                    'Can\'t edit shared item'
                                                                    : 'Item is ready or may has been served',
                                                            type: 'error'
                                                        }))
                                                    : null
                                                }>
                                                Edit
                                            </div>
                                            {orderDetails.type === 'Dine-In' ?
                                                <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(199, 223, 180)' }}
                                                    onClick={() => {
                                                        if (orderDetails.status && deletingItemId !== id && !deletingOrder && !closingId && !vanished) {
                                                            if (totalPrice !== 0) {
                                                                if (!splitted) {
                                                                    dispatch(customisedAction(CLEAR_TABLE_ORDERS))
                                                                    history.push({
                                                                        pathname: '/client/admin/dashboard/restaurant/itemSplit', state: {
                                                                            orderNumber,
                                                                            tableId: orderDetails.tableId,
                                                                            itemToSplit: { id, name, quantity, totalPrice }
                                                                        }
                                                                    })
                                                                } else dispatch(customisedAction(SET_TOAST, { message: 'Can\'t split shared item', type: 'error' }))
                                                            } else dispatch(customisedAction(SET_TOAST, { message: 'Can\'t split item with price "0"', type: 'error' }))
                                                        }
                                                    }}>
                                                    Split
                                                </div>
                                                : null
                                            }
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(248, 203, 173)' }}
                                                onClick={() => orderDetails.status && deletingItemId !== id && !deletingOrder && !closingId && !vanished ?
                                                    status === 'P' ?
                                                        dispatch(customisedAction(DELETE_ITEM, { id, restaurantId, orderNumber }))
                                                        : dispatch(customisedAction(SET_TOAST, {
                                                            message:
                                                                splitted ?
                                                                    'Can\'t delete shared item'
                                                                    : 'Item is ready or may has been served',
                                                            type: 'error'
                                                        }))
                                                    : null
                                                }>
                                                Void
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                            </>)
                        })
                        : <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No Items Added!</td>
                        </tr>
                    }
                    <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Sub Total</td>
                        <td style={{ textAlign: 'end' }}>{orderDetails.foodTotal} $</td>
                        <td />
                    </tr>
                    {orderDetails.discountAmount !== '0.00' && <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Discount <span style={{ opacity: 0.5 }}>({orderDetails.discount})</span></td>
                        <td style={{ textAlign: 'end', color: 'red' }}>- {orderDetails.discountAmount} $</td>
                        <td />
                    </tr>}
                    <tr style={{ border: orderDetails.tip !== '0.00' ? 'none' : '' }}>
                        <td colSpan={2} />
                        <td>Tax <span style={{ opacity: 0.5 }}>({orderDetails.taxPercentage})</span></td>
                        <td style={{ textAlign: 'end' }}>{orderDetails.taxAmount} $</td>
                        <td />
                    </tr>
                    {orderDetails.tip !== '0.00' && <tr>
                        <td colSpan={2} />
                        <td>Tip</td>
                        <td style={{ textAlign: 'end' }}>{orderDetails.tip} $</td>
                        <td />
                    </tr>}
                    <tr>
                        <td colSpan={2} />
                        <td style={{ fontWeight: 'bold' }}>Total</td>
                        <td style={{ fontWeight: 'bold', textAlign: 'end' }}>{orderDetails.billAmount} $</td>
                        <td />
                    </tr>
                    <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                </tbody>
            </table>
        </div>
    )
}

export default ItemsList;