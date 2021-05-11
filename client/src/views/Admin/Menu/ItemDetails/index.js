import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonRed, DropDown, Input, Picker, TitleWithAction } from '../../../../components'
import { BUCKET_URL, BUCKET_URL_2, DELETE_FROM_S3, SET_TOAST, SET_TOAST_DISMISSING, UPDATE_MENU, UPLOAD_TO_S3 } from '../../../../constants'
import { getIdByName, getNameById } from '../../../../helpers'
import { customisedAction } from '../../../../redux/actions'

import AddOnsList from '../AddOnsList'
import Add_EditAddOn from '../Add_EditAddOn'
import './styles.css'

function ItemDetails(props) {

  const [selectedItem, setselectedItem] = useState(null)
  const [editting, seteditting] = useState(false)
  const [selectedAddOn, setselectedAddOn] = useState(null)
  const [addingEdittingAddOn, setaddingEdittingAddOn] = useState(false)
  const [name, setname] = useState('')
  const [shortDescription, setshortDescription] = useState('')
  const [price, setprice] = useState('')
  const [categoryId, setcategoryId] = useState('')

  const updatingMenu = useSelector(({ menuReducer }) => menuReducer.updatingMenu)
  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  const uploading = useSelector(({ fileUploadReducer }) => fileUploadReducer.uploading)
  const imageUrl = useSelector(({ fileUploadReducer }) => fileUploadReducer.imageUrl)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { location: { state }, history } = props
  const { restaurantId } = admin

  useEffect(() => {
    if (!state)
      history.goBack()
    else {
      setselectedItem(state.item)
    }
  }, [])

  const uploadImage = async (image, stringArray) => {
    if (stringArray.length) {
      try {
        const parts = stringArray[0].split(';')
        const fileName = parts[1].split('=')[1]
        const file = new FormData();
        file.append('file', image[0]);
        file.append('filename', fileName);
        dispatch(customisedAction(UPLOAD_TO_S3, { file }))
      } catch (error) {
        console.log('error', error.message)
      }
    }
  }

  const enableEditting = () => {
    setname(selectedItem.name)
    setshortDescription(selectedItem.shortDescription)
    setprice(selectedItem.price)
    setcategoryId(selectedItem.categoryId)
    seteditting(true)
  }

  const cancelEditting = () => {
    setname('')
    setshortDescription('')
    setprice('')
    setcategoryId('')
    seteditting(false)
  }

  const showAddOnModal = (addOn) => {
    setselectedAddOn(addOn)
    setaddingEdittingAddOn(true)
  }

  const cancelModal = () => {
    setselectedAddOn(null)
    setaddingEdittingAddOn(false)
  }

  const validate = () => {
    if ((name != selectedItem.name && !!name)
      || (!!selectedItem.shortDescription && shortDescription != selectedItem.shortDescription)
      || (!selectedItem.shortDescription && !!shortDescription)
      || (price != selectedItem.price && price !== '')
      || (categoryId !== selectedItem.categoryId && !!categoryId)
      || imageUrl)
      return false
    else return true
  }

  const update = () => {
    const updatedData = {}
    updatedData.name = name
    updatedData.shortDescription = shortDescription
    updatedData.price = price
    updatedData.categoryId = categoryId
    if (imageUrl)
      updatedData.imageUrl = imageUrl
    dispatch(customisedAction(UPDATE_MENU, { updatedData, id: selectedItem.id, restaurantId, history }))
  }

  return (
    <div className="Container">
      <Add_EditAddOn addingEdittingAddOn={addingEdittingAddOn} selectedAddOn={selectedAddOn} menuId={selectedItem ? selectedItem.id : null} cancelModal={cancelModal} />
      <TitleWithAction
        text="Food Item Details"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={editting ?
          <div style={{ display: 'flex' }}>
            <ButtonRed
              style={{ marginRight: '10px' }}
              text="Cancel"
              iconLeft={<i className="fa fa-times-circle" />}
              onClick={() => cancelEditting()}
            /><Button
              text="Submit"
              light={updatingMenu || validate()}
              lightAction={() => {
                dispatch(customisedAction(SET_TOAST_DISMISSING))
                dispatch(customisedAction(SET_TOAST, { message: "Change some data to submit!", type: 'warning' }))
              }}
              iconLeft={<i className="fa fa-send" />}
              onClick={() => update()}
            />
          </div>
          : <div style={{ display: 'flex' }}>
            <Button
              style={{ marginRight: '10px' }}
              text="Edit Item"
              iconLeft={<i className="fa fa-edit" />}
              onClick={() => enableEditting()}
            /><Button
              text="Add Add-ons"
              iconLeft={<i className="fa fa-plus" />}
              onClick={() => setaddingEdittingAddOn(true)}
            />
          </div>
        }
      />
      {selectedItem ? <>
        <div className="ItemContainer">
          <div className="ItemDetailsContainer">
            <div className="ItemDetailsSections">
              <h4>Item Name:</h4>
              {editting ?
                <Input
                  placeholder="Item name"
                  value={name}
                  onChange={({ target: { value }}) => setname(value)}
                /> :
                <p>{selectedItem.name}</p>
              }
            </div>
            <div className="ItemDetailsSections">
              <h4>Short  Description:</h4>
              {editting ?
                <Input
                  placeholder="Short Description"
                  value={shortDescription || ''}
                  onChange={({ target: { value }}) => setshortDescription(value)}
                /> :
                <p>{selectedItem.shortDescription || '-'}</p>
              }
            </div>
            <div className="ItemDetailsSections">
              <h4>Price:</h4>
              {editting ?
                <Input
                  placeholder="Price"
                  type="number"
                  value={price}
                  onChange={({ target: { value }}) =>  setprice(value < 0 ? value * -1 : value)}
                /> :
                <p>$ {selectedItem.price}</p>
              }
            </div>
            <div className="ItemDetailsSections">
              <h4>Category:</h4>
              {editting ?
                <DropDown
                  placeholder="Select Category"
                  options={categories ? categories.map(category => category.name) : []}
                  value={categories ? getNameById(categories, categoryId) : null}
                  onChange={({ target: { value } }) => setcategoryId(getIdByName(categories, value))}
                /> :
                <p>{!fetchingCategories && categories ?
                    getNameById(categories, selectedItem.categoryId)
                  : 'No Category'
                }</p>
              }
            </div>
          </div>
          <div className="ItemImageContainer">
            <Picker
              style={{ width: '100%' }}
              imageUrl={editting ? imageUrl : selectedItem.imageUrl}
              uploading={uploading}
              showCancel={editting}
              extension={['.jpg', '.jpeg', '.gif', '.png']}
              onChange={uploadImage}
              onCancel={() => dispatch(customisedAction(DELETE_FROM_S3, { fileName: imageUrl.replace(BUCKET_URL, '').replace(BUCKET_URL_2, '')}))}
            />
          </div>
        </div>
        <div className="ItemDetailsSections">
          <h4>Add-Ons:</h4>
        </div>
        <AddOnsList addOns={selectedItem.addOns} editting={editting} showAddOnModal={showAddOnModal} />
      </> : null}
    </div>
  )
}

export default ItemDetails
