import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_MENU_ITEMS_REPORTS, PER_PAGE_COUNTS } from '../../../../constants'

import { Pagination, Input, ExcelExport, DatePicker } from '../../../../components'

import List from './List'

function MenuItems() {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)
  const date = new Date();
  const [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth(), 1))
  const [endDate, setEndDate] = useState(date)

  const fetchingMenuItemsReports = useSelector(({ reportsReducer }) => reportsReducer.fetchingMenuItemsReports)
  const menuItemsReports = useSelector(({ reportsReducer }) => reportsReducer.menuItemsReports)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!restaurantsFetchCalled && !fetchingMenuItemsReports && !menuItemsReports) {
      setrestaurantsFetchCalled(true)
      dispatch(customisedAction(GET_MENU_ITEMS_REPORTS, { restaurantId, startDate, endDate }))
    }
  }, [])

  const getFilteredList = () => {
    let filteredRestaurants = menuItemsReports
    if (filterKey && filterKey.length && menuItemsReports) {
      filteredRestaurants = menuItemsReports.filter(
        (item) => item.itemName.toLowerCase().includes(filterKey.toLowerCase())
        || item.category.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredRestaurants
  }

  const paginate = (list) => {
    let paginatedList = list ? [ ...list ] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Report by Menu Item</h2>
      <div className="TabularContentContainer">
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
              style={{ opacity: fetchingMenuItemsReports ? 0.5 : '' }}
              onClick={() => dispatch(customisedAction(GET_MENU_ITEMS_REPORTS, { restaurantId, startDate, endDate }))}>
              <p>Fetch</p>
            </div>
            <ExcelExport sheetName={"Restaurants"} data={getFilteredList()} />
          </div>
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Restaurants (by Name, Cuisine, City or Country)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingMenuItemsReports ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_MENU_ITEMS_REPORTS, { restaurantId, startDate, endDate }))}/>
          </div>
        </div>
        <List fetchingMenuItemsReports={fetchingMenuItemsReports} menuItemsReports={paginate(getFilteredList())} />
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

export default MenuItems
