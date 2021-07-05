import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, UPDATE_RESTAURANT } from '../../../constants'

import { Button, Input, SectionHeading, SmallTitle, TitleWithAction } from '../../../components'
import { capitalizeFirstLetter } from '../../../helpers'

function EditRestaurant(props) {

  const [restaurantId, setrestaurantId] = useState('')
  const [restaurantName, setrestaurantName] = useState('')
  const [cuisine, setcuisine] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')
  const [latitude, setlatitude] = useState('')
  const [longitude, setlongitude] = useState('')
  const [taxId, settaxId] = useState('')
  const [taxPercentage, settaxPercentage] = useState('')
  const [customMessage, setcustomMessage] = useState('')

  const restaurantToEdit = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurantToEdit)
  const addingUpdatingRestaurant = useSelector(({ restaurantsReducer }) => restaurantsReducer.addingUpdatingRestaurant)
  const dispatch = useDispatch()

  const { history } = props

  useEffect(() => {
    if (!restaurantToEdit) history.goBack()
    else {
      setrestaurantId(restaurantToEdit.restaurantId)
      setrestaurantName(restaurantToEdit.restaurantName)
      setcuisine(restaurantToEdit.cuisine)
      setaddress(restaurantToEdit.address)
      setcity(restaurantToEdit.city)
      setcountry(restaurantToEdit.country)
      setlatitude(restaurantToEdit.latitude)
      setlongitude(restaurantToEdit.longitude)
      settaxId(restaurantToEdit.taxId)
      settaxPercentage(restaurantToEdit.taxPercentage)
      setcustomMessage(restaurantToEdit.customMessage)
    }
  }, [])

  const validate = () => {
    if (!restaurantName)
      return 'Restaurant Name Required!'
    if (!cuisine)
      return 'Restaurant Cuisine Required!'
    if (!city)
      return 'Restaurant City Required!'
    if (!country)
      return 'Restaurant Country Required!'
    if (!address)
      return 'Detailed Address Required!'
    if (!taxId)
      return 'Tax ID Required!'
    if (!taxPercentage)
      return 'Tax Percentage Required!'
    if (restaurantName == restaurantToEdit.restaurantName
      && cuisine == restaurantToEdit.cuisine
      && address == restaurantToEdit.address
      && city == restaurantToEdit.city
      && country == restaurantToEdit.country
      && latitude == restaurantToEdit.latitude
      && longitude == restaurantToEdit.longitude
      && taxId == restaurantToEdit.taxId
      && taxPercentage == restaurantToEdit.taxPercentage
      && customMessage == restaurantToEdit.customMessage)
      return 'No field changed to update'
    return false
  }

  const editRestuarant = () => {
    const updatedData = {
      restaurantName: capitalizeFirstLetter(restaurantName),
      cuisine: capitalizeFirstLetter(cuisine),
      address,
      city,
      country,
      latitude,
      longitude,
      taxId,
      taxPercentage,
      customMessage
    }
    dispatch(customisedAction(UPDATE_RESTAURANT, { updatedData, restaurantId, history }))
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Edit Restaurant"
        noMargin
      />
      <div className="FormContainer">
        <div className="FormInnerContainer">
          <SectionHeading text="Restaurant Information" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Name" />
              <Input 
                placeholder="ABC Restaurant"
                value={restaurantName}
                onChange={({ target: { value } }) => setrestaurantName(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Cuisine(s)" />
              <Input 
                placeholder="Traditional, Continental, ..."
                value={cuisine}
                onChange={({ target: { value } }) => setcuisine(value)}
              />
            </div>
          </div>
        </div>
        <div className="FormInnerContainer">
          <SectionHeading text="Other Details" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer" style={{ flexDirection: 'row', paddingTop: '0px' }}>
              <div className="InputsInnerContainer"  style={{ width: '50%', paddingRight: '7px' }}>
                <SmallTitle text="Tax ID #" />
                <Input 
                  placeholder="NTN-111000"
                  value={taxId}
                  onChange={({ target: { value } }) => settaxId(value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="Tax Percentage %" />
                <Input 
                  placeholder="7.5"
                  type='number'
                  value={taxPercentage}
                  onChange={({ target: { value } }) => settaxPercentage(value)}
                />
              </div>
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Custom Message" />
              <Input 
                placeholder="Please come again. Thank you!"
                value={customMessage}
                onChange={({ target: { value } }) => setcustomMessage(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="FormContainer">
        <div className="FormInnerContainer">
          <SectionHeading text="Business Address" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Detailed Address" />
              <Input 
                placeholder="Block - A, Street, State"
                value={address}
                onChange={({ target: { value } }) => setaddress(value)}
              />
            </div>
            <div className="InputsInnerContainer" style={{ flexDirection: 'row', paddingTop: '0px' }}>
              <div className="InputsInnerContainer"  style={{ width: '50%', paddingRight: '7px' }}>
                <SmallTitle text="Country" />
                <Input 
                  placeholder="Pakistan"
                  value={country}
                  onChange={({ target: { value } }) => setcountry(value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="City" />
                <Input 
                  placeholder="Karachi"
                  value={city}
                  onChange={({ target: { value } }) => setcity(value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="FormInnerContainer">
          <SectionHeading text="Location" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Map" />
              <div style={{ marginTop: '10px', width: '100%', height: '140px', background: 'rgba(0, 0, 0, 0.5)' }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="ButtonContainer">
        <Button
          text="Submit"
          light={!!validate() || addingUpdatingRestaurant}
          lightAction={() => {
            dispatch(customisedAction(SET_TOAST_DISMISSING))
            dispatch(customisedAction(SET_TOAST, {
            message: validate() || 'Updating restaurant in progress',
            type: validate() ? 'error' : 'success'
          }))}}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => editRestuarant()}
        />
      </div>
    </div>
  )
}

export default EditRestaurant
