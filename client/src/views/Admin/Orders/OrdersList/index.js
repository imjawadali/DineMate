import React from 'react'
import { useDispatch } from 'react-redux'

import { TableActionicons, OrderTimer } from '../../../../components'
import { CLEAR_ORDER_DETAILS } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function OrdersList(props) {

    const dispatch = useDispatch()

    const { fetchingOrders, orders, restaurantId, history } = props

    return (
        <div className="TableDataContainer">
            <table >
                <thead>
                    <tr>
                        <th>Manage</th>
                        <th>Source</th>
                        <th>Check No</th>
                        <th style={{ textAlign: 'center' }}>Time</th>
                        <th style={{ textAlign: 'center' }}>Check Amount (Incl. tax)</th>
                        <th style={{ textAlign: 'center' }}>Status</th>
                        <th style={{ textAlign: 'center' }}>Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length ?
                        orders.map((order) => {
                            const { id, tableId, orderNumber, status, time, amount, staff } = order
                            return (<>
                                <tr key={id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <TableActionicons
                                                icon="fa fa-info"
                                                onClick={() => {
                                                  dispatch(customisedAction(CLEAR_ORDER_DETAILS))
                                                  history.push({
                                                    pathname: '/client/admin/ordersManagement/orderDetails',
                                                    state: { restaurantId, orderNumber }
                                                  })
                                                }}
                                            />
                                            <TableActionicons
                                                icon="fa fa-print"
                                                onClick={() => null}
                                            />
                                        </div>
                                    </td>
                                    <td>{tableId ? 'Table # ' : null}{tableId && tableId.length === 1 ? '0' : null}{tableId || 'Pick-Up'}</td>
                                    <td>{orderNumber}</td>
                                    <OrderTimer status={status} timeStamp={time} />
                                    <td style={{ textAlign: 'center' }}>$ {amount}</td>
                                    <td style={{ color: status ? 'green' : 'red', textAlign: 'center' }}>{status ? "Open" : "Closed"}</td>
                                    <td style={{ textAlign: 'center' }}>{status && staff || '-'}</td>
                                </tr>
                                <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                            </>)
                        })
                        : <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>{
                                fetchingOrders ?
                                    <p><i className={`fa fa-refresh ${fetchingOrders ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Orders . . .</p>
                                    : 'No Data Found!'
                            }</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersList;