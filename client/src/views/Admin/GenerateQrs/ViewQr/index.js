import React, { useEffect, useState } from 'react'
import QRCode from "qrcode.react";

import { CUSTOMER_APP_URL } from '../../../../constants'

import { Button } from '../../../../components'
import './styles.css'

function ViewQr(props) {

  const [selectedQr, setselectedQr] = useState(null)

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state) {
      history.push('/')
    } else {
      setselectedQr(state.qr)
    }
  }, [])

  return (
    <div className="Container">
      <h2>View QR</h2>
      <div className="QrContainer">
        <div className="QrInnerContainer" id="QrInnerContainer">
          {selectedQr ? 
            <QRCode
              id={selectedQr.id}
              value={CUSTOMER_APP_URL+"restaurant/"+selectedQr.value}
              size={200}
            /> : null
          }
          <h3 style={{ marginTop: '10px' }}>Dine Mate</h3>
        </div>
      <Button
        style={{ marginTop: '15px' }}
        text="Back"
        iconLeft={<i className="fa fa-arrow-circle-left" />}
        onClick={() => history.goBack()}
      />
      </div>
    </div>
  )
}

export default ViewQr
