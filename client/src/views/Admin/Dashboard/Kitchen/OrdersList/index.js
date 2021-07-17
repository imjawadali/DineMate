import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { MARK_ITEM_READY, MARK_ORDER_READY } from '../../../../../constants'
import { ReadyIcon, KitchenTimer } from '../../../../../components'

function OrdersList(props) {
  
  const markingId = useSelector(({ dashboardReducer }) => dashboardReducer.markingId)
  const markingOrderNumber = useSelector(({ dashboardReducer }) => dashboardReducer.markingOrderNumber)
  const dispatch = useDispatch()

  const { restaurantId, lateTime, kitchenDashboard, fetchingDashboard } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Complete</th>
            <th style={{ textAlign: 'center', width: '7%' }}>Ready</th>
            <th>Time</th>
            <th>Type</th>
            <th>Check #</th>
            <th>Table</th>
            <th>Quantity</th>
            <th>Item</th>
            <th>Item details</th>
            <th style={{ color: 'red' }}>Special Notes</th>
          </tr>
        </thead>
        <tbody>
          {kitchenDashboard && kitchenDashboard.length ?
            kitchenDashboard.map((order) => {
              const { data } = order
              return (
                <>{
                  data && data.length ?
                    data.map((item, index) => {
                      const { type, orderNumber, tableId, id, quantity, name, status, addOns, specialInstructions } = item
                      const addOnsArray = addOns && addOns.length ? JSON.parse(addOns) : null
                      return (
                        <tr key={id} className={index === data.length - 1 ? '' : 'NoBorder'}>
                          <td style={{ textAlign: 'center' }}>
                            {index === 0 ?
                              <div className="TableButtons TableButtonGreen"
                                style={{ width: '100%', opacity: markingOrderNumber === orderNumber ? 0.5 : '' }}
                                onClick={() => dispatch(customisedAction(MARK_ORDER_READY, { restaurantId, orderNumber }))}>
                                {markingOrderNumber === orderNumber ?
                                  <i className="fa fa-refresh fa-pulse" />
                                  : <p>Ready</p>
                                }
                              </div>
                              : null}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <ReadyIcon
                              status={status}
                              markingItemReady={markingId === id}
                              onClick={() => status !== 'R' ?
                                dispatch(customisedAction(MARK_ITEM_READY, { restaurantId, id }))
                                : null
                              }
                            />
                          </td>
                          <KitchenTimer lateTime={lateTime} index={index} timeStamp={data[data.length - 1].time} />
                          <td><p style={{ whiteSpace: 'nowrap' }}>{index === 0 ? type : ''}</p></td>
                          <td style={{ textAlign: 'center' }}>{index === 0 ? orderNumber : ''}</td>
                          <td style={{ textAlign: 'center' }}>{index === 0 ? tableId : ''}</td>
                          <td style={{ textAlign: 'center' }}>{quantity}</td>
                          <td><p style={{ textDecorationLine: status === 'R' ? 'line-through' : '' }}>{name}</p></td>
                          <td>{
                            addOnsArray && addOnsArray.length ?
                              addOnsArray.map((addOn, index) => <p key={index} style={{ display: 'inline' }}>{
                                addOn.addOnOption && addOn.addOnOption !== 'null' ? addOn.addOnOption : addOn.addOnName
                              }{index !== addOnsArray.length - 1 ? ', ' : ''}</p>)
                              : '-'
                          }</td>
                          <td style={{ color: 'red' }}>{specialInstructions}</td>
                        </tr>
                      )
                    })
                    : null}
                    <tr style={{ color: 'transparent' }}><td colSpan="10" style={{ backgroundColor: 'white' }} />.</tr>
                </>
              )
            }) :
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>
                {fetchingDashboard ?
                  <p><i className={`fa fa-refresh ${fetchingDashboard ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Kitchen Dashboard . . .</p>
                  : 'No items in-que!'}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
