import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, UPLOAD_TO_S3, DELETE_FROM_S3, BUCKET_URL, BUCKET_URL_2, ADD_MENU } from '../../../constants'

import { Button, ButtonRed, DropDown, Input, Picker, SectionHeading, SmallTitle } from '../../../components'
import { capitalizeFirstLetter, getIdByName } from '../../../helpers'
import './styles.css'

function AddMenuItem(props) {

  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [shortDescription, setshortDescription] = useState('')
  const [category, setcategory] = useState('')
  const [addOns, setaddOns] = useState([])

  const addingMenu = useSelector(({ menuReducer }) => menuReducer.addingMenu)
  const uploading = useSelector(({ fileUploadReducer }) => fileUploadReducer.uploading)
  const imageUrl = useSelector(({ fileUploadReducer }) => fileUploadReducer.imageUrl)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
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

  const addAddOns = () => {
    const tempAddOns = [ ...addOns, {
      name: '',
      price: 0,
      mandatory: false
    }]
    setaddOns(tempAddOns)
  }

  const updateAddOn = (index, key, value) => {
    const tempAddOns = [ ...addOns ]
    const selectedAddOn = addOns[index]
    selectedAddOn[key] = value
    tempAddOns[index] = selectedAddOn
    setaddOns(tempAddOns)
  }

  const deleteAddOn = (index) => {
    const tempAddOns = [ ...addOns ]
    tempAddOns.splice(index, 1)
    setaddOns(tempAddOns)
  }

  const addAddOptions = (index) => {
    const tempAddOns = [ ...addOns ]
    const selectedAddOn = addOns[index]
    const variations = selectedAddOn.variations || []
    variations.push({
      name: '',
      price: 0
    })
    selectedAddOn.variations = variations
    tempAddOns[index] = selectedAddOn
    setaddOns(tempAddOns)
  }

  const updateAddOnOption = (index, index2, key, value) => {
    const tempAddOns = [ ...addOns ]
    const selectedAddOn = addOns[index]
    const selectedVariation = selectedAddOn.variations[index2]
    selectedVariation[key] = value
    selectedAddOn.variations[index2] = selectedVariation
    tempAddOns[index] = selectedAddOn
    setaddOns(tempAddOns)
  }

  const deleteAddOnOption = (index, index2) => {
    const tempAddOns = [ ...addOns ]
    const selectedAddOn = addOns[index]
    const variations = selectedAddOn.variations
    variations.splice(index2, 1)
    if (variations.length)
      selectedAddOn.variations = variations
    else
      delete selectedAddOn.variations
    tempAddOns[index] = selectedAddOn
    setaddOns(tempAddOns)
  }

  const validate = () => {
    if (!name)
      return 'Item Name is required!'
    if (!price)
      return 'Item Price is required!'
    if (!category)
      return 'Item Category is required!'
    if (!imageUrl)
      return 'Item Image is required!'
    if (addOns && addOns.length) {
      for (var i = 0; i < addOns.length; i++) {
        if (!addOns[i].name)
          return `Add-On # ${i+1} Name is required!`
        if (addOns[i].variations && addOns[i].variations.length) {
          for (var j = 0; j < addOns[i].variations.length; j++) {
            if (!addOns[i].variations[j].name)
              return 'Option Can\'t be blank!'
          }
        }
      }
    }
    return false
  }

  const addMenuItem = () => {
    const payload = {
      restaurantId,
      imageUrl,
      name: capitalizeFirstLetter(name),
      price,
      shortDescription,
      categoryId: getIdByName(categories || [], category),
      addOns
    }
    dispatch(customisedAction(SET_TOAST_DISMISSING))
    dispatch(customisedAction(ADD_MENU, payload, { history: props.history, restaurantId }))
  }

  return (
    <div className="Container">
      <h2>Add Food Item</h2>
      <div className="FormContainer" style={{ borderBottom: 'none' }}>
        <div className="FormInnerContainer">
          <div className="InputsContainer">
            <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
              <SmallTitle text="Item Name" />
              <Input 
                placeholder="Chicken Cheese Burger"
                value={name}
                onChange={({ target: { value } }) => setname(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Item Price" />
              <Input 
                placeholder="5.0 ($)"
                type="number"
                value={price}
                onChange={({ target: { value } }) => setprice(value)}
              />
            </div>
          </div>
        </div>
        <div className="FormInnerContainer">
          <div className="InputsContainer">
            <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
              <SmallTitle text="Short Description" />
              <Input 
                placeholder="Ham and Cheese Croissant."
                value={shortDescription}
                onChange={({ target: { value } }) => setshortDescription(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Category" />
              <DropDown
                placeholder="Select Item Category"
                options={categories ? categories.map(category => category.name) : []}
                value={category}
                onChange={({ target: { value } }) => setcategory(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center' }}>
        <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
          <div className="InputsContainer">
            <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
              <SmallTitle text="Item Image" />
              <Picker
                height={'200px'}
                imageUrl={imageUrl}
                uploading={uploading}
                showCancel
                extension={['.jpg', '.jpeg', '.gif', '.png']}
                onChange={uploadImage}
                onCancel={() => dispatch(customisedAction(DELETE_FROM_S3, { fileName: imageUrl.replace(BUCKET_URL, '').replace(BUCKET_URL_2, '')}))}
              />
            </div>
          </div>
        </div>
      </div>
      {
        addOns.map((addOn, index) => 
        <div key={index} >
          <div className="FormContainer" style={{ justifyContent: 'center', borderBottom: 'none' }}>
            <div className="FormInnerContainer">
              <SectionHeading text={`Add-on # ${index+1}`} />
              <div className="InputsContainer">
                <div className="InputsInnerContainer">
                  <SmallTitle text="Add-on Type" />
                  <DropDown
                    placeholder="Select Add-on Type"
                    options={['Mandatory', 'Optional']}
                    value={addOn.mandatory ? 'Mandatory' : addOn.mandatory === false ? 'Optional' : null}
                    onChange={({ target: { value } }) => updateAddOn(index, 'mandatory', value ? value === 'Mandatory' ? true : false : null)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center', borderBottom: 'none' }}>
            <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
              <div className="InputsContainer">
                <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                  <SmallTitle text="Add-On Name" />
                  <Input 
                    placeholder="Flavour"
                    value={addOn.name}
                    onChange={({ target: { value } }) => updateAddOn(index, 'name', value)}
                  />
                </div>
              </div>
            </div>
            <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
              <div className="InputsContainer">
                <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                  <SmallTitle text="Add-On Price (Optional)" />
                  <Input 
                    placeholder="0.2 ($)"
                    type="number"
                    value={addOn.price}
                    onChange={({ target: { value } }) => updateAddOn(index, 'price', value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {addOn.variations && addOn.variations.length ?
            addOn.variations.map((option, index2) =>
            <div key={`${index}${index2}`} className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center', borderBottom: 'none' }}>
              <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                <div className="InputsContainer">
                  <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                    <SmallTitle text={`Option # ${index2+1}`} />
                    <Input 
                      placeholder="Cheesy"
                      value={option.name}
                      onChange={({ target: { value } }) => updateAddOnOption(index, index2, 'name', value)}
                    />
                  </div>
                </div>
              </div>
              <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                <div className="InputsContainer">
                  <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                    <SmallTitle text="Price (Optional)" />
                    <Input 
                      placeholder="0.33 ($)"
                      type="number"
                      value={option.price}
                      onChange={({ target: { value } }) => updateAddOnOption(index, index2, 'price', value)}
                    />
                  </div>
                </div>
              </div>
              <div className="ButtonContainer OptionButtonContainer">
                <i className="fa fa-arrow-left temp" style={{ marginRight: '10px' }}/>
                <ButtonRed
                  text="Delete Option"
                  iconLeft={<i className="fa fa-trash" />}
                  onClick={() => deleteAddOnOption(index, index2)}
                />
              </div>
            </div>)
          : null}
          <div className="FormContainer" style={{ padding: '0px', justifyContent: 'center' }}>
            <div className="ButtonContainer" style={{ paddingTop: '0px' }}>
              <ButtonRed
                text="Delete Add-On"
                iconLeft={<i className="fa fa-trash" />}
                onClick={() => deleteAddOn(index)}
              />
              <Button
                text={addOn.variations && addOn.variations.length ? "Add more options" : "Add options"}
                style={{ marginLeft: '15px' }}
                iconLeft={<i className="fa fa-plus" />}
                onClick={() => addAddOptions(index)}
              />
            </div>
          </div>
        </div>)
      }
      <div className="ButtonContainer">
        <Button
          text="Submit"
          light={!!validate() || addingMenu}
          lightAction={() => {
            dispatch(customisedAction(SET_TOAST_DISMISSING))
            dispatch(customisedAction(SET_TOAST, {
            message: validate() || 'Adding item in progress',
            type: validate() ? 'error' : 'success'
          }))}}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => addMenuItem()}
        />
        <Button
          text={addOns.length ? "Add more" : "Add Add-Ons"}
          style={{ marginLeft: '15px' }}
          iconLeft={<i className="fa fa-plus" />}
          onClick={() => addAddOns()}
        />
      </div>
    </div>
  )
}

export default AddMenuItem
