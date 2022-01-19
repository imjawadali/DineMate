import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_ORDERS_REPORTS, PER_PAGE_COUNTS } from '../../../../constants'

import { Pagination, Input, ExcelExport, DatePicker } from '../../../../components'

import List from './List'

function Orders() {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)
  const date = new Date();
  const [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth(), 1))
  const [endDate, setEndDate] = useState(date)
  const [revenue, setrevenue] = useState(0)
  const [revenueCount, setrevenueCount] = useState(0)
  const [tax, settax] = useState(0)
  const [taxCount, settaxCount] = useState(0)
  const [discounts, setdiscounts] = useState(0)
  const [discountsCount, setdiscountsCount] = useState(0)
  const [tips, settips] = useState(0)
  const [tipsCount, settipsCount] = useState(0)
  const [voids, setvoids] = useState(0)
  const [voidsCount, setvoidsCount] = useState(0)
  const [cash, setcash] = useState(0)
  const [cashCount, setcashCount] = useState(0)
  const [credit, setcredit] = useState(0)
  const [creditCount, setcreditCount] = useState(0)

  const fetchingOrdersReports = useSelector(({ reportsReducer }) => reportsReducer.fetchingOrdersReports)
  const ordersReports = useSelector(({ reportsReducer }) => reportsReducer.ordersReports)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!restaurantsFetchCalled && !fetchingOrdersReports && !ordersReports) {
      setrestaurantsFetchCalled(true)
      dispatch(customisedAction(GET_ORDERS_REPORTS, { restaurantId, startDate, endDate }))
    }
  }, [])

  const getFilteredList = () => {
    let filteredRestaurants = ordersReports
    if (filterKey && filterKey.length && ordersReports) {
      filteredRestaurants = ordersReports.filter(
        (data) => data.checkNumber.toLowerCase().includes(filterKey.toLowerCase())
          || data.source.toLowerCase().includes(filterKey.toLowerCase())
          || data.status.toLowerCase().includes(filterKey.toLowerCase())
          || data.paymentMethod.toLowerCase().includes(filterKey.toLowerCase())
          || data.guestName.toLowerCase().includes(filterKey.toLowerCase())
          || data.staff.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredRestaurants
  }

  useEffect(() => {
    if (getFilteredList() && getFilteredList().length) {
      let temp = getFilteredList().filter(item => item.status != "Void")
      setrevenueCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['checkTotal']) || 0), 0)
      setrevenue((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.status != "Void")
      settaxCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['taxAmount']) || 0), 0)
      settax((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.discountAmount > 0.00 && item.status != "Void")
      setdiscountsCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['discountAmount']) || 0), 0)
      setdiscounts((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.tipAmount > 0.00 && item.status != "Void")
      settipsCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['tipAmount']) || 0), 0)
      settips((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.status == "Void")
      setvoidsCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['checkTotal']) || 0), 0)
      setvoids((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.paymentMethod == "Cash" && item.status != "Void")
      setcashCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['checkTotal']) || 0), 0)
      setcash((temp || 0).toFixed(2))

      temp = getFilteredList().filter(item => item.paymentMethod != "Cash" && item.status != "Void")
      setcreditCount(temp.length)
      temp = temp
        .reduce((a, b) => a + (Number(b['checkTotal']) || 0), 0)
      setcredit((temp || 0).toFixed(2))
    }
  }, [getFilteredList()])

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Detailed Revenue Report</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TableButtons RevenueButtonGreen"
            style={{ marginLeft: 0, opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Total Revenue</p>
            <p>${revenue} ({revenueCount})</p>
          </div>
          <div className="TableButtons RevenueButtonRed"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Tax</p>
            <p>${tax} ({taxCount})</p>
          </div>
          <div className="TableButtons RevenueButtonBrown"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Discount</p>
            <p>${discounts} ({discountsCount})</p>
          </div>
          <div className="TableButtons RevenueButtonOrange"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Tips</p>
            <p>${tips} ({tipsCount})</p>
          </div>
          <div className="TableButtons RevenueButtonBlue"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Void</p>
            <p>${voids} ({voidsCount})</p>
          </div>
          <div className="TableButtons RevenueButtonSeaBlue"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Cash</p>
            <p>${cash} ({cashCount})</p>
          </div>
          <div className="TableButtons RevenueButtonPurple"
            style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}>
            <p>Credit Card</p>
            <p>${credit} ({creditCount})</p>
          </div>
        </div>
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            <DatePicker
              selected={startDate}
              onChange={(startDate) => setStartDate(startDate)}
            />
            <DatePicker
              selected={endDate}
              onChange={(endDate) => setEndDate(endDate)}
            />
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: fetchingOrdersReports ? 0.5 : '' }}
              onClick={() => dispatch(customisedAction(GET_ORDERS_REPORTS, { restaurantId, startDate, endDate }))}>
              <p>Fetch</p>
            </div>
            <ExcelExport sheetName={"Revenue Report"} data={getFilteredList()} />
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Check (by CheckNumber, Source, Status, Guest Name, Staff Name, Payment Method)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingOrdersReports ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_ORDERS_REPORTS, { restaurantId, startDate, endDate }))} />
          </div>
        </div>
        <List fetchingOrdersReports={fetchingOrdersReports} ordersReports={paginate(getFilteredList())} />
        {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ?
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={getFilteredList().length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
          : null}
      </div>
    </div>
  )
}

export default Orders
