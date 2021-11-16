import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, SET_TOAST, SET_TOAST_DISMISSING, UPDATE_CATEGORY } from '../../../constants'
import { capitalizeFirstLetter } from '../../../helpers'

import { Button, Input } from '../../../components'

import CategoriesList from './CategoriesList'

function Categories() {

  const [filterKey, setfilterKey] = useState('')
  const [typing, settyping] = useState(false)
  const [categoryName, setcategoryName] = useState('')
  const [selectedCategory, setselectedCategory] = useState(null)

  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const addingCategory = useSelector(({ categoriesReducer }) => categoriesReducer.addingCategory)
  const updatingCategory = useSelector(({ categoriesReducer }) => categoriesReducer.updatingCategory)
  const deletingCategory = useSelector(({ categoriesReducer }) => categoriesReducer.deletingCategory)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (fetchingCategories) reset()
  }, [fetchingCategories])

  useEffect(() => {
    if (!fetchingCategories && !categories) dispatch(customisedAction(GET_CATEGORIES, { restaurantId }))
  }, [])

  const reset = () => {
    setcategoryName('')
    setselectedCategory(null)
    settyping(false)
  }

  const isValid = () => {
    if (!categoryName || !categoryName.replaceAll(' ', '').replaceAll('\'', '').replaceAll(',', '').replaceAll('.', '')) {
      dispatch(customisedAction(SET_TOAST_DISMISSING, true))
      dispatch(customisedAction(SET_TOAST, { message: 'Enter a valid category name!', type: 'error'}))
      return false
    } return true
  }

  const addCategory = () => {
    if (isValid())
      dispatch(customisedAction(ADD_CATEGORY, { name: capitalizeFirstLetter(categoryName), restaurantId }))
  }

  const UpdateCategory = () => {
    if (isValid())
      dispatch(customisedAction(UPDATE_CATEGORY, { id: selectedCategory.id, name: capitalizeFirstLetter(categoryName), restaurantId }))
  }

  const onSelect = (category) => {
    setselectedCategory(category)
    setcategoryName(category.name)
    settyping(!typing)
  }

  const onDelete = (id) => {
    dispatch(customisedAction(DELETE_CATEGORY, { id, restaurantId }))
  }

  const getFilteredList = () => {
    let filteredRestaurants = categories
    if (filterKey && filterKey.length && categories) {
      filteredRestaurants = categories.filter(
        (category) => category.name.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredRestaurants
  }

  return (
    <div className="Container">
      <h2>Categories Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            {typing ?
            <>
              <Input 
                style={{ border: 'none', borderBottom: '1px solid black', background: categoryName ? 'white' : 'transparent' }}
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={({ target: { value } }) => setcategoryName(value)}
              />
              <i 
                style={{ margin: '0px 10px' }}
                className={`fa ${selectedCategory ? 'fa-send' : 'fa-plus-circle'} fa-lg`}
                onClick={() => selectedCategory ? UpdateCategory() : addCategory()}
              />
            </>
            : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                onClick={() => settyping(true)}>
                <i style={{ margin: '0px 10px' }} className="fa fa-plus fa-lg" />
                <p>Add</p>
              </div>
            }
          </div>
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Category (by Name)"
              value={filterKey}
              onChange={({ target: { value } }) => setfilterKey(value)}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingCategories ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_CATEGORIES, { restaurantId }))}/>
          </div>
        </div>
      <CategoriesList 
        onSelect={onSelect}
        onDelete={onDelete}
        reset={reset}
        fetchingCategories={fetchingCategories}
        selectedCategory={selectedCategory}
        categories={getFilteredList()} />
      </div>
    </div>
  )
}

export default Categories
