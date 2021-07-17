import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Input, Picker, SectionHeading, SmallTitle, TitleWithAction } from '../../../../components'
import { BUCKET_URL, BUCKET_URL_2, DELETE_FROM_S3, GET_RESTAURANT_SETTINGS, UPDATE_RESTAURANT_SETTINGS, UPLOAD_TO_S3 } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function Restaurant() {

  const [updatedData, setupdatedData] = useState({})

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingRestaurantSettings = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingRestaurantSettings)
  const restaurantSettings = useSelector(({ restaurantReducer }) => restaurantReducer.restaurantSettings)
  const updatingRestaurantSettings = useSelector(({ restaurantReducer }) => restaurantReducer.updatingRestaurantSettings)
  const uploading = useSelector(({ fileUploadReducer }) => fileUploadReducer.uploading)
  const imageUrl = useSelector(({ fileUploadReducer }) => fileUploadReducer.imageUrl)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (restaurantSettings)
      setupdatedData(restaurantSettings)
  }, [restaurantSettings])

  const uploadImage = (image, stringArray) => {
    if (stringArray.length) {
      try {
        const parts = stringArray[0].split(';')
        const fileName = parts[1].split('=')[1]
        const file = new FormData();
        file.append('file', image[0]);
        file.append('filename', fileName);
        dispatch(customisedAction(UPLOAD_TO_S3, { file, restaurantId, updateRestaurantSettings: true }))
      } catch (error) {
        console.log('error', error.message)
      }
    }
  }

  const updateValue = (key, value) => {
    const tempData = { ...updatedData }
    tempData[key] = value
    setupdatedData(tempData)
  }

  const validate = () => {
    if (((updatedData.cuisine === restaurantSettings.cuisine)
      || !updatedData.cuisine)
      && ((updatedData.lateTime == restaurantSettings.lateTime)
      || !updatedData.lateTime)
      && ((updatedData.taxId === restaurantSettings.taxId)
      || !updatedData.taxId)
      && ((updatedData.taxPercentage == restaurantSettings.taxPercentage)
      || !updatedData.taxPercentage)
      && ((updatedData.customMessage == restaurantSettings.customMessage)
      || (!updatedData.customMessage && !restaurantSettings.customMessage)))
      return true
    return false
  }

  const update = () => {
    dispatch(customisedAction(UPDATE_RESTAURANT_SETTINGS, { restaurantId, updatedData }))
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Settings"
        button={
          <Button
            text={fetchingRestaurantSettings ? "Syncing" : "Refresh"}
            light={fetchingRestaurantSettings}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-refresh ${fetchingRestaurantSettings ? 'fa-pulse' : ''}`} />}
            onClick={() => dispatch(customisedAction(GET_RESTAURANT_SETTINGS, { restaurantId }))}
          />
        }
      />
      <div className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center' }}>
        <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
          <SectionHeading text="Restaurant Image" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer" style={{ paddingTop: '10px' }}>
              <Picker
                height={'200px'}
                imageUrl={restaurantSettings.imageUrl || imageUrl}
                uploading={uploading}
                showCancel={!!(restaurantSettings.imageUrl || imageUrl)}
                extension={['.jpg', '.jpeg', '.gif', '.png']}
                onChange={uploadImage}
                onCancel={() => dispatch(customisedAction(DELETE_FROM_S3, {
                  fileName: (restaurantSettings.imageUrl || imageUrl)
                    .replace(BUCKET_URL, '')
                    .replace(BUCKET_URL_2, ''),
                  updateRestaurantSettings: restaurantSettings.imageUrl ? true : false,
                  restaurantId
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="FormContainer">
        <div className="FormInnerContainer">
          <SectionHeading text="Restaurant Information" />
          <div className="InputsContainer">
            <div className="InputsInnerContainer">
              <SmallTitle text="Cuisine(s)" />
              <Input
                placeholder="Traditional, Continental, ..."
                value={updatedData.cuisine}
                onChange={({ target: { value } }) => updateValue('cuisine', value)}
              />
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Late time" />
              <Input
                placeholder="Late time in minutes"
                type="number"
                value={updatedData.lateTime}
                onChange={({ target: { value } }) => updateValue('lateTime', value)}
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
                  value={updatedData.taxId}
                  onChange={({ target: { value } }) => updateValue('taxId', value)}
                />
              </div>
              <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                <SmallTitle text="Tax Percentage %" />
                <Input
                  placeholder="7.5"
                  type='number'
                  value={updatedData.taxPercentage}
                  onChange={({ target: { value } }) => updateValue('taxPercentage', value)}
                />
              </div>
            </div>
            <div className="InputsInnerContainer">
              <SmallTitle text="Custom Message" />
              <Input
                placeholder="Please come again. Thank you!"
                value={updatedData.customMessage}
                onChange={({ target: { value } }) => updateValue('customMessage', value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ButtonContainer">
        <Button
          text="Submit"
          light={fetchingRestaurantSettings || updatingRestaurantSettings || validate()}
          lightAction={() => null}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => update()}
        />
      </div>
    </div>
  )
}

export default Restaurant
