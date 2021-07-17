import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Input, TitleWithAction } from '../../../../components'
import { GET_GENERIC_DATA, UPDATE_GENERIC_DATA } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function SuperAdmin() {

  const [updatedData, setupdatedData] = useState({})

  const fetchingGenericData = useSelector(({ genericDataReducer }) => genericDataReducer.fetchingGenericData)
  const updatingGenericData = useSelector(({ genericDataReducer }) => genericDataReducer.updatingGenericData)
  const genericData = useSelector(({ genericDataReducer }) => genericDataReducer.genericData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetchingGenericData && !genericData)
      dispatch(customisedAction(GET_GENERIC_DATA))
  }, [])

  useEffect(() => {
    setupdatedData(genericData)
  }, [genericData])

  const updateValue = (key, value) => {
    const tempData = { ...updatedData }
    tempData[key] = value
    setupdatedData(tempData)
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Settings"
        button={
          <Button
            text={fetchingGenericData ? "Syncing" : "Refresh"}
            light={fetchingGenericData}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-refresh ${fetchingGenericData ? 'fa-pulse' : ''}`} />}
            onClick={() => dispatch(customisedAction(GET_GENERIC_DATA))}
          />
        }
      />
      <div>
        <p>Youtube Link:</p>
        <Input
          placeholder="Paste youtube embeded link here"
          value={updatedData.youtubeLink}
          onChange={({ target: { value } }) => updateValue('youtubeLink', value)}
        />
      </div>
      <div>
        <p>Facebook Link:</p>
        <Input
          placeholder="Paste facebook link here"
          value={updatedData.facebookLink}
          onChange={({ target: { value } }) => updateValue('facebookLink', value)}
        />
      </div>
      <div>
        <p>Instagram Link:</p>
        <Input
          placeholder="Paste instagram link here"
          value={updatedData.instagramLink}
          onChange={({ target: { value } }) => updateValue('instagramLink', value)}
        />
      </div>
      <div>
        <p>Play Store Link:</p>
        <Input
          placeholder="Paste play store link here"
          value={updatedData.playstoreLink}
          onChange={({ target: { value } }) => updateValue('playstoreLink', value)}
        />
      </div>
      <div>
        <p>App Store Link:</p>
        <Input
          placeholder="Paste app store link here"
          value={updatedData.appstoreLink}
          onChange={({ target: { value } }) => updateValue('appstoreLink', value)}
        />
      </div>
      <div>
        <p>Contact Email:</p>
        <Input
          placeholder="Enter email here"
          value={updatedData.email}
          onChange={({ target: { value } }) => updateValue('email', value)}
        />
      </div>
      <div className="ButtonContainer">
        <Button
          text="Submit"
          light={fetchingGenericData || updatingGenericData}
          lightAction={() => null}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => dispatch(customisedAction(UPDATE_GENERIC_DATA, { updatedData }))}
        />
      </div>
    </div>
  )
}

export default SuperAdmin
