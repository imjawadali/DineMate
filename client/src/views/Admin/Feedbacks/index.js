import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_FEEDBACKS, PER_PAGE_COUNTS } from '../../../constants'

import { Pagination, Input } from '../../../components'

import FeedbacksList from './FeedbacksList'

function Feedbacks() {

  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingFeedbacks = useSelector(({ feedbacksReducer }) => feedbacksReducer.fetchingFeedbacks)
  const feedbacks = useSelector(({ feedbacksReducer }) => feedbacksReducer.feedbacks)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!fetchingFeedbacks && !feedbacks) dispatch(customisedAction(GET_FEEDBACKS, { restaurantId }))
  }, [])

  const getFilteredList = () => {
    let filtereList = feedbacks
    if (filterKey && filterKey.length && feedbacks) {
      filtereList = feedbacks.filter(
        (feedback) => feedback.firstName.toLowerCase().includes(filterKey.toLowerCase())
          || feedback.lastName.toLowerCase().includes(filterKey.toLowerCase())
          || feedback.feedback?.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filtereList
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
      <h2>Feedbacks</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Feedback (by Name, Text)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingFeedbacks ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_FEEDBACKS, { restaurantId }))} />
          </div>
        </div>
        <FeedbacksList fetchingFeedbacks={fetchingFeedbacks} feedbacks={paginate(getFilteredList())} />
        {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ?
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={getFilteredList().length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
          : null}
      </div>
    </div>
  )
}

export default Feedbacks
