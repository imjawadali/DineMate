import React from 'react'
import { useSelector } from 'react-redux'
import QRCode from "qrcode.react";

import { CUSTOMER_APP_URL } from '../../../../constants'

import { SmallButton } from '../../../../components'

function QrsList(props) {

  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)

  const { restaurantId, history } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>QR Codes</th>
            <th>Table ID</th>
            <th>Restaurant ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {qrs && qrs.length ?
            qrs.map((qr) => {
              const { id, value, active } = qr
              const tableNumber = value.replace(`${restaurantId}/`, '')
              return (
                <tr key={id}>
                  <td>
                    <QRCode
                      id={id}
                      value={CUSTOMER_APP_URL+"restaurant/"+value}
                      size={40}
                    />
                  </td>
                  <td>{tableNumber.length === 1 ? '0' : null}{tableNumber}</td>
                  <td>{restaurantId}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="View"
                      iconLeft={<i className="fa fa-eye" />}
                      onClick={() => history.push({
                        pathname: `/admin/qrsManagement/viewQr`, state: { qr }
                      })}
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
