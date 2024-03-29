import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import QRCode from "qrcode.react";

import { CUSTOMER_APP_URL, SET_TABLE_NAME } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions';
import { Button, Input, TitleWithAction } from '../../../../components'
import './styles.css'

function TableDetails(props) {

  const [selectedTable, setselectedTable] = useState(null)
  const [tableName, settableName] = useState('')
  
  const settingTableName = useSelector(({ restaurantReducer }) => restaurantReducer.settingTableName)
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state) {
      history.push('/')
    } else {
      setselectedTable(state.table)
      settableName(state.table.tableName)
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
      <TitleWithAction
        text="Table Details"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={<div className="QrButtonsContainer">
          <i className="fa fa-download fa-2x" onClick={() => downloadQR()}/>
          <i className="fa fa-print fa-2x" onClick={() => window.print()}/>
        </div>}
      />
      {selectedTable ?
        <div className="TableContainer">
          <div className="TableDetailsContainer">
            <div className="TableDetailsSections">
              <h4>Restaurant ID:</h4>
              <p>{state.restaurantId}</p>
            </div>
            <div className="TableDetailsSections">
              <h4>Status:</h4>
              <p>{selectedTable.active ? 'Active' : 'In-Active'}</p>
            </div>
            <div className="TableDetailsSections">
              <h4>Table No:</h4>
              <p>
                {selectedTable.value.length === 1 ? '0' : null}
                {selectedTable.value}
              </p>
            </div>
            <div className="TableDetailsSections">
              <h4>Table Name:</h4>
              <div className="TableNameContainer">
                <Input
                  style={{ margin: '0px' }}
                  placeholder="Enter Table Name"
                  value={tableName}
                  onChange={({ target: { value } }) => settableName(value)}
                />
              </div>
            </div>
            <div className="TableNameButtonContainer">
              {tableName && tableName !== selectedTable.tableName ?
                <Button
                  text="Update"
                  light={settingTableName}
                  lightAction={() => null}
                  iconLeft={<i className="fa fa-check-circle" />}
                  onClick={() => dispatch(customisedAction(SET_TABLE_NAME, { 
                    id: selectedTable.id, 
                    tableName, 
                    restaurantId: state.restaurantId,
                    history
                  }))}
                />
              : null}
            </div>
          </div>
          <div className="QrInnerContainer">
            <QRCode
              id={selectedTable.id}
              value={CUSTOMER_APP_URL+state.restaurantId+"/"+selectedTable.value}
              size={200}
            />
          </div>
        </div>
      : null}
    </div>
  )
}

export default TableDetails
