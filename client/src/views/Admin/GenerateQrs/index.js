import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, GENERATE_QRS } from '../../../constants'

import { Button, Input } from '../../../components'

import QrsList from './QrsList'

function GenerateQrs(props) {
  
  const [generateQrInput, setgenerateQrInput] = useState('')
  const [qrCounts, setqrCounts] = useState(0)

  const generatingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.generatingQrs)
  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state || history.action === 'POP') {
      history.goBack()
    } else if (qrs && qrs.length) {
      setqrCounts(qrs.length)
    } else {
      setqrCounts(state.qrCounts)
    }
  }, [qrs])

  const generateQrs = () => {
    if (!generateQrInput || generateQrInput < 1 || isNaN(generateQrInput)) {
      dispatch(customisedAction(SET_TOAST_DISMISSING, true))
      dispatch(customisedAction(SET_TOAST, { message: 'Input must be a number greater than zero!', type: 'error'}))
    } else {
      const generatedQrData = {
        "restaurantId": state.restaurantId,
        values: []
      }
      for (let index = qrCounts; index < Number(qrCounts)+Number(generateQrInput); index++) {
        generatedQrData.values.push(`${state.restaurantId}/${index+1}`)
      }
      setgenerateQrInput('')
      dispatch(customisedAction(GENERATE_QRS, generatedQrData))
    }
  }

  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>QRs Management</h2>
        <div className="PageTitleButtonContainer">
          <Button
            text="Edit Restaurant"
            iconLeft={<i className="fa fa-edit" />}
            onClick={() => history.push('/admin/editRestaurant')} />
        </div>
      </div>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Number of Qrs you want to generate ?"
            value={generateQrInput}
            onChange={({ target: { value } }) => setgenerateQrInput(value)}
          />
        </div>
        <div className="TopButtonContainer" style={{ justifyContent: 'flex-start' }}>
          <Button
            text="Generate"
            light={generatingQrs || fetchingQrs}
            lightAction={() => null}
            iconLeft={<i className="fa fa-plus-circle" />}
            onClick={() => generateQrs()}
          />
        </div>
      </div>
      {fetchingQrs ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingQrs ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Qrs!</p>
        </div> : null
      }
      <QrsList restaurantId={state && state.restaurantId} history={history} />
    </div>
  )
}

export default GenerateQrs
