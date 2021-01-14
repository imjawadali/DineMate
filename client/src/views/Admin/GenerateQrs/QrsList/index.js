import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import QRCode from "qrcode.react";

import { customisedAction } from '../../../../redux/actions'
import { GET_EXISTING_QRS, CUSTOMER_APP_URL } from '../../../../constants'

import { SmallTitle, SmallButton } from '../../../../components'

function QrsList(props) {

  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const dispatch = useDispatch()

  const { restaurantId } = props

  useEffect(() => {
    if (!fetchingQrs && !qrs)
      dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))
  }, [])

  const downloadQR = (id) => {
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
  };

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>QR Codes</th>
            <th>Table ID</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {qrs && qrs.length ?
            qrs.map((qr) => {
              const { id, value, active } = qr
              return (
                <tr key={id}>
                  <td>
                    <QRCode
                      id={id}
                      value={CUSTOMER_APP_URL+value}
                      size={40}
                    />
                  </td>
                  <td>{value.replace(`${restaurantId}/`, '')}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="View"
                      disabled
                      disabledAction={() => null}
                    />
                  </td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Download"
                      onClick={() => downloadQR(id)}
                    />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default QrsList
