import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Separator } from '../../../../components'
import { getNameById } from '../../../../helpers'

import AddOnsList from '../AddOnsList'
import './styles.css'

function ItemDetails(props) {

  const [selectedItem, setselectedItem] = useState(null)

  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state)
      history.goBack()
    else {
      setselectedItem(state.item)
    }
  }, [])

  return (
    <div className="Container">
      <h2>Food Item Details</h2>
      {selectedItem ? <>
        <div className="ItemContainer">
          <div className="ItemDetailsContainer">
            <div className="ItemDetailsSections">
              <h4>Item Name:</h4>
              <p>{selectedItem.name}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Short  Description:</h4>
              <p>{selectedItem.shortDescription || '-'}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Price:</h4>
              <p>$ {selectedItem.price}</p>
            </div>
            <div className="ItemDetailsSections">
              <h4>Category:</h4>
              <p>{!fetchingCategories && categories ?
                  getNameById(categories, selectedItem.categoryId)
                : 'No Category'
              }</p>
            </div>
          </div>
          <div className="ItemImageContainer">
            Image
          </div>
        </div>
        <div className="ItemDetailsSections">
          <h4>Add-Ons:</h4>
        </div>
        <AddOnsList addOns={selectedItem.addOns} />
      </> : null}
    </div>
  )
}

export default ItemDetails
