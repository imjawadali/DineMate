import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, ADD_RESTAURANT } from '../../../constants'

import { Button, Input, SectionHeading, SmallTitle, TitleWithAction } from '../../../components'
import './styles.css'
import { capitalizeFirstLetter } from '../../../helpers'

function AddRestaurant(props) {

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
  const [stripeConnectedAccountId, setstripeConnectedAccountId] = useState('')
  const [pName, setpName] = useState('')
  const [pEmail, setpEmail] = useState('')
  const [pPhoneNumber, setpPhoneNumber] = useState('')
  const [sName, setsName] = useState('')
  const [sEmail, setsEmail] = useState('')
  const [sPhoneNumber, setsPhoneNumber] = useState('')

  const addingUpdatingRestaurant = useSelector(({ restaurantsReducer }) => restaurantsReducer.addingUpdatingRestaurant)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  const setRestaurantNameAndId = (name) => {
    let tempRestaurantId
    if (name)
      tempRestaurantId = name.replaceAll(' ', '_').replaceAll('\'', '').replaceAll(',', '').replaceAll('.', '')
    else tempRestaurantId = null

    if (tempRestaurantId && tempRestaurantId.replaceAll('_', '')) {
      setrestaurantName(capitalizeFirstLetter(name))
      setrestaurantId(tempRestaurantId.toLowerCase())
    } else {
      setrestaurantName('')
      setrestaurantId('')
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
    if (!taxId)
      return 'Tax ID Required!'
    if (!taxPercentage)
      return 'Tax Percentage Required!'
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
      address,
      city,
      country,
      latitude,
      longitude,
      taxId,
      taxPercentage,
      customMessage,
      stripeConnectedAccountId,
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
      <TitleWithAction
        text="Add Restaurant"
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
                onChange={({ target: { value } }) => setRestaurantNameAndId(value)}
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
              <div className="InputsInnerContainer" style={{ width: '50%', paddingRight: '7px' }}>
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
            <div className="InputsInnerContainer" style={{ flexDirection: 'row', alignItems: 'flex-end', paddingTop: '0px' }}>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingRight: '7px' }}>
                <SmallTitle text="Custom Message (Optional)" />
                <Input
                  placeholder="Please come again. Thank you!"
                  value={customMessage}
                  onChange={({ target: { value } }) => setcustomMessage(value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="Stripe ID (Optional)" />
                <Input
                  placeholder="acct_xxxxxxxxxxxxxx"
                  value={stripeConnectedAccountId}
                  onChange={({ target: { value } }) => setstripeConnectedAccountId(value)}
                />
              </div>
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
              <div className="InputsInnerContainer" style={{ width: '50%', paddingRight: '7px' }}>
                <SmallTitle text="Country" />
                <Input
                  placeholder="Canada"
                  value={country}
                  onChange={({ target: { value } }) => setcountry(value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="City" />
                <Input
                  placeholder="Toronto"
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
              <div style={{ marginTop: '10px', width: '100%', height: '140px', background: 'rgba(0, 0, 0, 0.5)' }} />
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
                placeholder="John Doe"
                value={pName}
                onChange={({ target: { value } }) => setpName(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Email" />
              <Input
                placeholder="john.doe@abcrestaurant.com"
                value={pEmail}
                onChange={({ target: { value } }) => setpEmail(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Phone Number" />
              <Input
                placeholder="+1 315-8731014"
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
                placeholder="John Doe"
                value={sName}
                onChange={({ target: { value } }) => setsName(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Email" />
              <Input
                placeholder="john.doe@abcrestaurant.com"
                value={sEmail}
                onChange={({ target: { value } }) => setsEmail(value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Phone Number" />
              <Input
                placeholder="+1 315-8731014"
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
            }))
          }}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => addRestuarant()}
        />
      </div>
    </div>
  )
}

export default AddRestaurant
