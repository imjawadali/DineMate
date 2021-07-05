import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING, GENERATE_QRS, GET_RESTAURANT_TO_EDIT, PER_PAGE_COUNTS } from '../../../constants'

import { Button, Input, Pagination, TitleWithAction } from '../../../components'

import QrsList from './QrsList'

function GenerateQrs(props) {

  const [generateQrInput, setgenerateQrInput] = useState('')
  const [qrCounts, setqrCounts] = useState(0)
  const [currentIndex, setcurrentIndex] = useState(1)

  const generatingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.generatingQrs)
  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state || history.action === 'POP') {
      history.goBack()
    } else if (qrs && qrs.length) {
      setqrCounts(qrs.length)
    } else {
      setqrCounts(state.qrCounts)
    }
  }, [qrs])

  const generateQrs = () => {
    if (!generateQrInput || generateQrInput < 1 || isNaN(generateQrInput)) {
      dispatch(customisedAction(SET_TOAST_DISMISSING, true))
      dispatch(customisedAction(SET_TOAST, { message: 'Input must be a number greater than zero!', type: 'error' }))
    } else {
      const generatedQrData = {
        "restaurantId": state.restaurantId,
        values: []
      }
      for (let index = qrCounts; index < Number(qrCounts) + Number(generateQrInput); index++) {
        generatedQrData.values.push(`${index + 1}`)
      }
      setgenerateQrInput('')
      dispatch(customisedAction(GENERATE_QRS, generatedQrData))
    }
  }

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="QRs Management"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        noMargin
        button={<Button
          text="Edit Restaurant"
          iconLeft={<i className={`fa fa-edit`} />}
          onClick={() => dispatch(customisedAction(GET_RESTAURANT_TO_EDIT, { restaurantId: state.restaurantId, history }))}
        />}
      />
      <div className="TabularContentContainer" >
        <div className="TableTopContainer">
          <div className="TopLeftContainer" />
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: '1px solid black', background: generateQrInput ? 'white' : 'transparent' }}
              placeholder="Number of Qrs you want to generate ?"
              type="number"
              value={generateQrInput}
              onChange={({ target: { value } }) => {
                if (value !== '0') setgenerateQrInput(value < 0 ? value * -1 : value)
              }}
            />
            <i
              style={{ margin: '0px 10px' }}
              className={`fa fa-${generatingQrs || fetchingQrs ? 'refresh fa-pulse' : 'plus-circle'} fa-lg`}
              onClick={() => generateQrs()} />
          </div>
        </div>
        <QrsList qrs={paginate(qrs)} restaurantId={state && state.restaurantId} fetchingQrs={fetchingQrs} />
        {qrs && qrs.length && qrs.length > PER_PAGE_COUNTS ?
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(qrs.length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={qrs.length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
          : null}
      </div>
    </div>
  )
}

export default GenerateQrs
