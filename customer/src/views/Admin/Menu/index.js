import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'

import { Button, Input } from '../../../components'

import MenuList from './MenuList'
import { GET_MENU } from '../../../constants'

function Menu(props) {

  const [filterKey, setfilterKey] = useState('')

  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
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

  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Menu Management</h2>
        <div className="PageTitleButtonContainer">
          <Button
            text="Add Food Item"
            iconLeft={<i className="fa fa fa-plus-circle" />}
            onClick={() => props.history.push('/client/admin/menuManagement/addFoodItem')} />
        </div>
      </div>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Search Item (by Name)"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text={filterKey ? "Clear" : fetchingMenu ? "Syncing" : "Refresh"}
            light={fetchingMenu}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-${filterKey ? 'times-circle' : fetchingMenu ? 'refresh fa-pulse' : 'refresh'}`} />}
            onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_MENU, { restaurantId }))} />
        </div>
      </div>
      {fetchingMenu && !menu ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingMenu ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Food Items . . .</p>
        </div> : null
      }
      <MenuList 
        history={props.history}
        menu={getFilteredList()} />
    </div>
  )
}

export default Menu
