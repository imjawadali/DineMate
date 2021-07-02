import React from 'react'
import { TableActionicons } from '../../../../components'

function OrdersList(props) {
    const { fetchingOrders, orders } = props
    return (
        <div className="TableDataContainer">
            <table >
                <thead>
                    <tr>
                        <th>Manage</th>
                        <th>Table No</th>
                        <th>Type</th>
                        <th>Check No</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length ?
                        orders.map((val, ind) => {
                            const tableNumber = val.tableId
                            return (<>
                                <tr>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <TableActionicons
                                                icon="fa fa-info"
                                                onClick={() => null}
                                            />
                                            <TableActionicons
                                                icon="fa fa-close"
                                                onClick={() => null}
                                            />
                                        </div>
                                    </td>
                                    <td>{tableNumber && tableNumber.length === 1 ? '0' : null}{tableNumber || '-'}</td>
                                    <td>{val.type}</td>
                                    <td>{val.orderNumber}</td>
                                    <td>{val.status ? "Open" : "Close"}</td>
                                </tr></>
                            )
                        })
                        : <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>{
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