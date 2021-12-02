import React from 'react'
import { useDispatch } from 'react-redux'

import { TableActionicons } from '../../../../components'
import { UPDATE_RESERVATION } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function ReservationsList(props) {

  const { restaurantId, fetchingReservations, updatingReservation, reservations } = props
  const dispatch = useDispatch()

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Manage</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>seats</th>
            <th>Date</th>
            <th>Time</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {reservations && reservations.length ?
            reservations.map((x) => {
              const { id, customerId, name, phoneNumber, email, seats, date, time, comments, status } = x
              return (
                <tr key={id}>
                  <td style={{ width: '10vw' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      opacity: fetchingReservations || updatingReservation ? 0.5 : 1
                    }}>
                      {status === 'p' || status === 'r'
                        ? <TableActionicons
                          icon="fa fa-check"
                          style={{ color: 'green' }}
                          onClick={() => !fetchingReservations && !updatingReservation
                            ? dispatch(customisedAction(UPDATE_RESERVATION, { id, customerId, status: 'a', restaurantId }))
                            : null
                          }
                        />
                        : null}
                      {status === 'p' || status === 'a'
                        ? <TableActionicons
                          icon="fa fa-times"
                          style={{ color: 'red' }}
                          onClick={() => !fetchingReservations && !updatingReservation
                            ? dispatch(customisedAction(UPDATE_RESERVATION, { id, customerId, status: 'r', restaurantId }))
                            : null
                          }
                        />
                        : null}
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>{phoneNumber}</td>
                  <td>{email}</td>
                  <td>{seats}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{comments || "-"}</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>{
                fetchingReservations ?
                  <p><i className="fa fa-refresh fa-pulse" style={{ padding: '0px 5px' }} />Fetching Reservations . . .</p>
                  : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ReservationsList
