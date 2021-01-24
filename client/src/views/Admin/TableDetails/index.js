import React, { useEffect, useState } from 'react'
import QRCode from "qrcode.react";

import { CUSTOMER_APP_URL } from '../../../constants'

import { Button } from '../../../components'
import './styles.css'

function TableDetails(props) {

  const [selectedTable, setselectedTable] = useState(null)

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state) {
      history.push('/')
    } else {
      setselectedTable(state.table)
    }
  }, [])

  const downloadQR = () => {
    const canvas = document.getElementById(selectedTable.id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${selectedTable.value}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="Container">
      <h2>Table Details</h2>
      <div className="QrContainer">
        <div className="QrInnerContainer" id="QrInnerContainer">
          {selectedTable ? 
            <QRCode
              id={selectedTable.id}
              value={CUSTOMER_APP_URL+"restaurant/"+selectedTable.value}
              size={200}
            /> : null
          }
          <h3 style={{ marginTop: '10px' }}>Dine Mate</h3>
        </div>
      </div>
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Back"
        light
        lightAction={() => history.goBack()}
      />
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Download"
        onClick={() => downloadQR()}
      />
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Print"
        light
        lightAction={() => window.print()}
      />
    </div>
  )
}

export default TableDetails
