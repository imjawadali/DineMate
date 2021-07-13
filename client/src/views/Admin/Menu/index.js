import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'

import { Input, Pagination } from '../../../components'

import MenuList from './MenuList'
import { GET_MENU, PER_PAGE_COUNTS } from '../../../constants'

function Menu(props) {

  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!fetchingMenu && !menu) dispatch(customisedAction(GET_MENU, { restaurantId }))
  }, [])

  const getFilteredList = () => {
    let filteredQrs = menu
    if (filterKey && filterKey.length && menu) {
      filteredQrs = menu.filter(
        (item) => item.name.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredQrs
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
      <h2>Menu Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
          </div>
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Item (by Name)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                if (value !== '0') {
                  setfilterKey(value)
                  setcurrentIndex(1)
                }
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingMenu ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_MENU, { restaurantId }))}/>
          </div>
        </div>
        <MenuList 
          history={props.history}
          fetchingMenu={fetchingMenu}
          menu={paginate(getFilteredList())} />
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

export default Menu
