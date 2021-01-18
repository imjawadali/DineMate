import React from 'react'
import QRCode from "qrcode.react";

import { CUSTOMER_APP_URL } from '../../../../constants'

import { Button } from '../../../../components'
import './styles.css'

function Qr(props) {

  const { qr, onBack } = props
  const { id, value } = qr

  const downloadQR = () => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="Container">
      <h2>Print QR</h2>
      <div className="QrContainer">
        <div className="QrInnerContainer" id="QrInnerContainer">
          <QRCode
            id={id}
            value={CUSTOMER_APP_URL+"restaurant/"+value}
            size={200}
          />
          <h3 style={{ marginTop: '10px' }}>Dine Mate</h3>
        </div>
      </div>
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Back"
        disabled
        disabledAction={() => onBack()}
      />
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Download"
        onClick={() => downloadQR()}
      />
      <Button
        style={{ width: '100%', marginTop: '15px' }}
        text="Print"
        disabled
        disabledAction={() => window.print()}
      />
    </div>
  )
}

export default Qr
