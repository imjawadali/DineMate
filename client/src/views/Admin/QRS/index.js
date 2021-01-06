import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import QRCode from "qrcode.react";

import { customisedAction } from '../../../redux/actions'
import { GET_EXISTING_QRS, CUSTOMER_APP_URL } from '../../../constants'

import { SmallTitle, SmallButton } from '../../../components'
import './styles.css'

function QRS(props) {

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
    !fetchingQrs ? qrs && qrs.length ? 
    <div className="Container">
      {
        qrs.map((qr) => {
          return (
            <div key={qr.id} className="RowContainer">
            <div className="SectionsContainer" style={{ padding: '5px 0px' }}>
              <QRCode
                id={qr.id}
                value={CUSTOMER_APP_URL+qr.value}
                size={100}
              />
            </div>
              <div className="SectionsContainer DoubleSectionsContainer">
                <div className="RestaurantSectionsContainer">
                  <div className="RestaurantSections">
                    <h4>Restaurant ID: </h4>
                    <SmallTitle text={restaurantId} />
                  </div>
                  <div className="RestaurantSections">
                    <h4>Table ID: </h4>
                    <div><SmallTitle text={qr.value.replace(`${restaurantId}/`, '')} /></div>
                  </div>
                </div>
              </div>
              <div className="SectionsContainer" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="RestaurantActionContainer">
                  <SmallButton
                    style={{ width: '100%' }}
                    text="Download"
                    onClick={() => {
                      downloadQR(qr.id)
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })
      }
    </div> : 
    <div className="loadingContainer">
      <p>No Data Found!</p>
    </div> :
    <div className="loadingContainer">
      <p>Fetching Qrs!</p>
    </div>
  )
}

export default QRS
