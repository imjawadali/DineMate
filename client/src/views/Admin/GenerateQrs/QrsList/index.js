import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import QRCode from "qrcode.react";

import { Pagination } from '../../../../components';
import { CUSTOMER_APP_URL, PER_PAGE_COUNTS } from '../../../../constants'

function QrsList(props) {

  const { qrs, restaurantId, fetchingQrs } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>QR Codes</th>
            <th>Table ID</th>
            <th>Restaurant ID</th>
            <th>Status</th>
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
                      value={CUSTOMER_APP_URL + restaurantId + "/" + value}
                      size={40}
                    />
                  </td>
                  <td>{value.length === 1 ? '0' : null}{value}</td>
                  <td>{restaurantId}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {fetchingQrs ?
                  <p><i className={`fa fa-refresh ${fetchingQrs ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Qrs!</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default QrsList
