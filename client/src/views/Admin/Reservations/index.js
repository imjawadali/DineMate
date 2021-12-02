import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_RESERVATIONS, PER_PAGE_COUNTS } from '../../../constants'

import { Pagination, Input } from '../../../components'

import ReservationsList from './ReservationsList'

function Reservations() {

  const [filterKey, setfilterKey] = useState('p')
  const [searchKey, setsearchKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)
  const [filteredReservations, setfilteredReservations] = useState(null)

  const fetchingReservations = useSelector(({ reservationsReducer }) => reservationsReducer.fetchingReservations)
  const updatingReservation = useSelector(({ reservationsReducer }) => reservationsReducer.updatingReservation)
  const reservations = useSelector(({ reservationsReducer }) => reservationsReducer.reservations)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!fetchingReservations && !reservations) dispatch(customisedAction(GET_RESERVATIONS, { restaurantId }))
  }, [])

  useEffect(() => {
    let filtereList = reservations
    if (reservations) {
      filtereList = reservations.filter(reservation => reservation.status == filterKey)
      if (searchKey && searchKey.length && reservations) {
        filtereList = filtereList.filter(
          (reservation) => reservation.name.toLowerCase().includes(searchKey.toLowerCase())
            || reservation.phoneNumber.toLowerCase().includes(searchKey.toLowerCase())
            || reservation.email.toLowerCase().includes(searchKey.toLowerCase())
            || reservation.seats == searchKey
            || reservation.date.toLowerCase().includes(searchKey.toLowerCase())
            || reservation.time.toLowerCase().includes(searchKey.toLowerCase())
            || reservation.comments?.toLowerCase().includes(searchKey.toLowerCase())
        )
      }
    }
    setfilteredReservations(filtereList)
  }, [reservations, filterKey, searchKey])

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Reservations</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'p' ? 0.5 : '' }}
              onClick={() => setfilterKey('p')}>
              <p>Pending</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'a' ? 0.5 : '' }}
              onClick={() => setfilterKey('a')}>
              <p>Approved</p>
            </div>
            <div className="TableButtons TableButtonOrange"
              style={{ opacity: filterKey === 'r' ? 0.5 : '' }}
              onClick={() => setfilterKey('r')}>
              <p>Rejected</p>
            </div>
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: 'none', background: searchKey ? 'white' : 'transparent' }}
              placeholder="Search Reservation (by Name, Phone Number, Email, Seats, Date, Time, Comments)"
              value={searchKey}
              onChange={({ target: { value } }) => {
                setsearchKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: searchKey ? 'red' : '' }}
              className={`fa fa-${searchKey ? 'times-circle' : fetchingReservations || updatingReservation ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => searchKey ? setsearchKey('') : dispatch(customisedAction(GET_RESERVATIONS, { restaurantId }))} />
          </div>
        </div>
        <ReservationsList
          restaurantId={restaurantId}
          fetchingReservations={fetchingReservations}
          updatingReservation={updatingReservation}
          reservations={paginate(filteredReservations)}
        />
        {filteredReservations && filteredReservations.length && filteredReservations.length > PER_PAGE_COUNTS ?
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(filteredReservations.length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={filteredReservations.length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
          : null}
      </div>
    </div>
  )
}

export default Reservations
