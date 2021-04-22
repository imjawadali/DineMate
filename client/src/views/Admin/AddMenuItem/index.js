import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, ADD_RESTAURANT, UPLOAD_TO_S3, DELETE_FROM_S3, BUCKET_URL, BUCKET_URL_2 } from '../../../constants'

import { Button, Input, Picker, SectionHeading, SmallTitle } from '../../../components'
import './styles.css'
import { capitalizeFirstLetter } from '../../../helpers'

function AddMenuItem(props) {

  const [restaurantId, setrestaurantId] = useState('')
  const [restaurantName, setrestaurantName] = useState('')
  const [cuisine, setcuisine] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')
  const [latitude, setlatitude] = useState('')
  const [longitude, setlongitude] = useState('')
  const [pName, setpName] = useState('')
  const [pEmail, setpEmail] = useState('')
  const [pPhoneNumber, setpPhoneNumber] = useState('')
  const [sName, setsName] = useState('')
  const [sEmail, setsEmail] = useState('')
  const [sPhoneNumber, setsPhoneNumber] = useState('')

  const addingUpdatingRestaurant = useSelector(({ restaurantsReducer }) => restaurantsReducer.addingUpdatingRestaurant)
  const uploading = useSelector(({ fileUploadReducer }) => fileUploadReducer.uploading)
  const imageUrl = useSelector(({ fileUploadReducer }) => fileUploadReducer.imageUrl)
  const dispatch = useDispatch()

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
    if (!pName)
      return 'Primary Contact Name Required!'
    if (!pEmail)
      return 'Primary Contact Email Required!'
    if (!pPhoneNumber)
      return 'Primary Contact Number Required!'
    if (sEmail && !sName)
      return 'Secondary Contact Name Required!'
    if (sName && !sEmail)
      return 'Secondary Contact Email Required!'
    return false
  }

  const addRestuarant = () => {
    const payload = {
      restaurantId,
      restaurantName,
      cuisine: capitalizeFirstLetter(cuisine),
      address: {
        address,
        city,
        country,
        latitude,
        longitude
      },
      primaryContact: {
        name: pName,
        email: pEmail,
        contactNumber: pPhoneNumber
      },
      secondaryContact: null
    }
    if (sName && sEmail) {
      payload.secondaryContact = {
        name: sName,
        email: sEmail,
        contactNumber: sPhoneNumber
      }
    }
    dispatch(customisedAction(SET_TOAST_DISMISSING))
    dispatch(customisedAction(ADD_RESTAURANT, payload, { history: props.history }))
  }

  return (
    <div className="Container">
      <h2>Add Food Item</h2>
      <div className="FormContainer">
        <div className="FormInnerContainer">
          <SectionHeading text="Restaurant Information" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Name" />
              <Input 
                placeholder="Eg. (ABC Restaurant)"
                value={restaurantName}
                onChange={({ target: { value } }) => setrestaurantName(value)}
              />
            </div>
            <div className="InputsInnerContainer" style={{ flexDirection: 'row', paddingTop: '0px' }}>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingRight: '7px' }}>
                <SmallTitle text="Cuisine" />
                <Input 
                  placeholder="Eg. (Traditional)"
                  value={cuisine}
                  onChange={({ target: { value } }) => setcuisine(value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="City" />
                <Input 
                  placeholder="Eg. (Karachi)"
                  value={city}
                  onChange={({ target: { value } }) => setcity(value)}
                />
              </div>
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Country" />
              <Input 
                placeholder="Eg. (Pakistan)"
                value={country}
                onChange={({ target: { value } }) => setcountry(value)}
              />
            </div>
          </div>
        </div>
        <div className="FormInnerContainer">
          <SectionHeading text="Business Address" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
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
            <div className="InputsInnerContainer">
              <SmallTitle text="Detailed Address" />
              <Input 
                placeholder="Eg. (Block - A, Street, State)"
                value={address}
                onChange={({ target: { value } }) => setaddress(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="FormContainer">
        <div className="FormInnerContainer">
          <SectionHeading text="Primary Contact Information" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Name" />
              <Input 
                placeholder="Eg. (John Doe)"
                value={pName}
                onChange={({ target: { value } }) => setpName(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Email" />
              <Input 
                placeholder="Eg. (john.doe@abcrestaurant.com)"
                value={pEmail}
                onChange={({ target: { value } }) => setpEmail(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Phone Number" />
              <Input 
                placeholder="Eg. (+92 315 8731014)"
                value={pPhoneNumber}
                onChange={({ target: { value } }) => setpPhoneNumber(value)}
              />
            </div>
          </div>
        </div>
        <div className="FormInnerContainer">
          <SectionHeading text="Secondary Contact Information (Optional)" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Name" />
              <Input 
                placeholder="Eg. (John Doe)"
                value={sName}
                onChange={({ target: { value } }) => setsName(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Email" />
              <Input 
                placeholder="Eg. (john.doe@abcrestaurant.com)"
                value={sEmail}
                onChange={({ target: { value } }) => setsEmail(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Phone Number" />
              <Input 
                placeholder="Eg. (+92 315 8731014)"
                value={sPhoneNumber}
                onChange={({ target: { value } }) => setsPhoneNumber(value)}
              />
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
            message: validate() || 'Adding restaurant in progress',
            type: validate() ? 'error' : 'success'
          }))}}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => null}
        />
      </div>
    </div>
  )
}

export default AddMenuItem
