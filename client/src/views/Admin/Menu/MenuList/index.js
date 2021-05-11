import React from 'react'
import { useSelector } from 'react-redux'

import { Separator, SmallButton } from '../../../../components'
import { getNameById } from '../../../../helpers'

function MenuList(props) {

  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  
  const { menu, fetchingMenu, history } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Short  Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Add-ons</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menu && menu.length ?
            menu.map((item) => {
              const { id, name, shortDescription, price, addOns, categoryId } = item
              return (
                <tr key={id}>
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
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Details"
                      iconLeft={<i className="fa fa-info" />}
                      onClick={() => history.push({
                        pathname: `/client/admin/menuManagement/itemDetails`, state: { item }
                      })} />
                  </td>
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
