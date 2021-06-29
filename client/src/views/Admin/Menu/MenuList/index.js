import React from 'react'
import { useSelector } from 'react-redux'

import { Separator, SmallButton, TableActionicons } from '../../../../components'
import { getNameById } from '../../../../helpers'

function MenuList(props) {

  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)

  const { menu, fetchingMenu, history } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Manage</th>
            <th>Item Name</th>
            <th>Short  Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Add-ons</th>
          </tr>
        </thead>
        <tbody>
          {menu && menu.length ?
            menu.map((item) => {
              const { id, name, shortDescription, price, addOns, categoryId } = item
              return (
                <tr key={id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TableActionicons
                        icon="fa-info-circle"
                        onClick={() => history.push({
                          pathname: `/client/admin/menuManagement/itemDetails`, state: { item }
                        })} />
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>{shortDescription || '-'}</td>
                  <td>$ {price}</td>
                  <td>{!fetchingCategories && categories ?
                    getNameById(categories, categoryId)
                    : 'No Category'
                  }</td>
                  <td>{addOns && addOns.length ?
                    addOns.map((addOn, index) => <div key={addOn.id}>
                      <p>{addOn.name}</p>
                      {index !== (addOns.length - 1) ? <Separator /> : null}
                    </div>)
                    : 'No Add-ons'
                  }</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                {fetchingMenu ?
                  <p><i className={`fa fa-refresh ${fetchingMenu ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Food Items . . .</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default MenuList
