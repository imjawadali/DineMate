import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_ORDERS_REPORTS_BY_INTERVAL, PER_PAGE_COUNTS } from '../../../../constants'

import { Pagination, Input, ExcelExport, DatePicker } from '../../../../components'

import List from './List'

function OrdersByInterval() {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0)
  const [startDate, setStartDate] = useState(date)
  const [endDate, setEndDate] = useState(null)

  const fetchingOrdersReportsByInterval = useSelector(({ reportsReducer }) => reportsReducer.fetchingOrdersReportsByInterval)
  const ordersReportsByInterval = useSelector(({ reportsReducer }) => reportsReducer.ordersReportsByInterval)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!restaurantsFetchCalled && !fetchingOrdersReportsByInterval && !ordersReportsByInterval) {
      setrestaurantsFetchCalled(true)
      dispatch(customisedAction(GET_ORDERS_REPORTS_BY_INTERVAL, { restaurantId, startDate, endDate }))
    }
  }, [])

  const getIntervaledList = (ordersReports) => {
    const intervaledList = []
    for (var index = 0; index < 24; index++) {
      let dataList = ordersReports.filter(item => item.checkOpen.slice(11, 13) == index)
      if (dataList && dataList.length) {
        const dataSet = {
          checkNumber: '',
          staff: '',
          subtotal: 0,
          taxAmount: 0,
          discountAmount: 0,
          tipAmount: 0,
          redemption: 0,
          checkTotal: 0,
          firstCheckOpenedAt: '',
          firstCheckClosedAt: '',
          source: '',
          status: '',
          paymentMethod: ''
        }
        let dineIn = 0, takeAway = 0, closed = 0, voids = 0, cash = 0, credit = 0, none = 0
        for (let index2 = 0; index2 < dataList.length; index2++) {
          dataSet.checkNumber += `${index2 ? ', ' : ''}${dataList[index2].checkNumber}`
          if (dataList[index2].staff != '-' && !dataSet.staff.toLowerCase().includes(dataList[index2].staff.toLowerCase()))
            dataSet.staff += `${index2 ? ', ' : ''}${dataList[index2].staff}`
          dataSet.subtotal += Number(dataList[index2].subtotal || 0)
          dataSet.taxAmount += Number(dataList[index2].taxAmount || 0)
          dataSet.discountAmount += Number(dataList[index2].discountAmount || 0)
          dataSet.tipAmount += Number(dataList[index2].tipAmount || 0)
          dataSet.redemption += Number(dataList[index2].redemption || 0)
          dataSet.checkTotal += Number(dataList[index2].checkTotal || 0)
          if (dataList[index2].source == 'Take-Away') takeAway += 1
          else dineIn += 1
          if (dataList[index2].status == 'Closed') closed += 1
          else voids += 1
          if (dataList[index2].paymentMethod == 'Cash') cash += 1
          else if (dataList[index2].paymentMethod == 'Credit') credit += 1
          else none += 1

        }
        if (!dataSet.staff) dataSet.staff = '-'
        dataSet.subtotal = dataSet.subtotal.toFixed(2)
        dataSet.taxAmount = dataSet.taxAmount.toFixed(2)
        dataSet.discountAmount = dataSet.discountAmount.toFixed(2)
        dataSet.tipAmount = dataSet.tipAmount.toFixed(2)
        dataSet.redemption = dataSet.redemption.toFixed(2)
        dataSet.checkTotal = dataSet.checkTotal.toFixed(2)
        dataSet.firstCheckOpenedAt = dataList[dataList.length - 1].checkOpen
        dataSet.firstCheckClosedAt = dataList[dataList.length - 1].checkClose
        dataSet.source = `Dine-In: ${dineIn}, Take-Away: ${takeAway}`
        dataSet.status = `Closed: ${closed}, Void: ${voids}`
        dataSet.paymentMethod = `Cash: ${cash}, Credit: ${credit}, None: ${none}`
        intervaledList.push({
          interval: `${index < 10 ? '0' + index : index}:00 - ${index < 10 ? '0' + index : index}:59`,
          ...dataSet
        })
      }
    }
    // console.log(intervaledList)
    return intervaledList
  }

  const getFilteredList = () => {
    let filteredList = ordersReportsByInterval
    if (filterKey && filterKey.length && ordersReportsByInterval) {
      filteredList = ordersReportsByInterval.filter(
        (data) => data.checkNumber.toLowerCase().includes(filterKey.toLowerCase())
          || data.source.toLowerCase().includes(filterKey.toLowerCase())
          || data.status.toLowerCase().includes(filterKey.toLowerCase())
          || data.paymentMethod.toLowerCase().includes(filterKey.toLowerCase())
          || data.guestName.toLowerCase().includes(filterKey.toLowerCase())
          || data.staff.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    if (filteredList && filteredList.length)
      filteredList = getIntervaledList(filteredList)
    return filteredList
  }

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Sales by Hourly Interval</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            <DatePicker
              showTimeSelect={false}
              selected={startDate}
              onChange={(date) => {
                let startDate, endDate

                startDate = new Date(date)
                startDate.setDate(startDate.getDate())
                startDate.setUTCHours(0, 0, 0, 0)

                endDate = new Date(date)
                endDate.setDate(endDate.getDate())
                endDate.setUTCHours(23, 59, 59, 999)

                const currentDate = new Date();
                if (date.getFullYear() == currentDate.getFullYear()
                  && date.getMonth() == currentDate.getMonth()
                  && date.getDay() == currentDate.getDay()) {
                  endDate = null
                }
                setStartDate(startDate)
                setEndDate(endDate)
                dispatch(customisedAction(GET_ORDERS_REPORTS_BY_INTERVAL, { restaurantId, startDate, endDate }))
              }}
            />
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
              className={`fa fa-${filterKey ? 'times-circle' : fetchingOrdersReportsByInterval ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_ORDERS_REPORTS_BY_INTERVAL, { restaurantId, startDate, endDate }))} />
          </div>
        </div>
        <List fetchingOrdersReportsByInterval={fetchingOrdersReportsByInterval} ordersReportsByInterval={paginate(getFilteredList())} />
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

export default OrdersByInterval
