import React from 'react'

import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

function DatePicker({ showTimeSelect, shouldCloseOnSelect, selected, onChange }) {
  return (
  <ReactDatePicker
    showTimeSelect={showTimeSelect == undefined ? true : showTimeSelect}
    shouldCloseOnSelect={shouldCloseOnSelect}
    dateFormat={'dd/MM/yyyy'}
    className='DatePicker'
    wrapperClassName="TableButtons TableButtonGrey"
    selected={selected}
    onChange={onChange}
  />
  )
}

export { DatePicker }
