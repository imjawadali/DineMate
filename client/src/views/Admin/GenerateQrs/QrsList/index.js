import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import QRCode from "qrcode.react";

import { Pagination } from '../../../../components';
import { CUSTOMER_APP_URL, PER_PAGE_COUNTS } from '../../../../constants'

function QrsList(props) {

  const [currentIndex, setcurrentIndex] = useState(1)

  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)

  const { restaurantId, fetchingQrs } = props

  const paginate = (list) => {
    let paginatedList = list ? [ ...list ] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <>
      <div className="HorizontalScrollContainer">
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
            {paginate(qrs) && paginate(qrs).length ?
              paginate(qrs).map((qr) => {
                const { id, value, active } = qr
                return (
                  <tr key={id}>
                    <td>
                      <QRCode
                        id={id}
                        value={CUSTOMER_APP_URL+restaurantId+"/"+value}
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
      {qrs && qrs.length && qrs.length > PER_PAGE_COUNTS ? 
        <Pagination
          currentIndex={currentIndex}
          mappingCounts={Array(parseInt(qrs.length / PER_PAGE_COUNTS) + 1).fill('0')}
          totalCounts={qrs.length}
          perPageCounts={PER_PAGE_COUNTS}
          onClick={(index) => setcurrentIndex(index)}
        />
      : null}
    </>
  )
}

export default QrsList
