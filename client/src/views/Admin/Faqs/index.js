import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'

import { Button, Input, Pagination, SectionHeading, SmallTitle, TitleWithAction } from '../../../components'

import FaqsList from './FaqsList'
import { ADD_FAQ, DELETE_FAQ, GET_GENERIC_DATA, PER_PAGE_COUNTS, SET_TOAST, SET_TOAST_DISMISSING } from '../../../constants'

function Faqs() {

  const [userDialogOpen, setuserDialogOpen] = useState(false)
  const [name, setname] = useState('')
  const [value, setvalue] = useState('')
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingGenericData = useSelector(({ genericDataReducer }) => genericDataReducer.fetchingGenericData)
  const addingFaq = useSelector(({ genericDataReducer }) => genericDataReducer.addingFaq)
  const genericData = useSelector(({ genericDataReducer }) => genericDataReducer.genericData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetchingGenericData && !genericData.faqs) dispatch(customisedAction(GET_GENERIC_DATA))
  }, [])

  useEffect(() => {
    if (!addingFaq) reset()
  }, [addingFaq])

  const reset = () => {
    setname('')
    setvalue('')
    setuserDialogOpen(false)
  }
  
  const validate = () => {
    if (!name)
      return 'Question is required!'
    if (!value)
      return 'Answer is required!'
    return false
  }

  const onDelete = (id) => {
    dispatch(customisedAction(DELETE_FAQ, { id }))
  }

  const getFilteredList = () => {
    let filteredQrs = genericData.faqs
    if (filterKey && filterKey.length && genericData.faqs) {
      filteredQrs = genericData.faqs.filter(
        (item) => (item.question.toLowerCase().includes(filterKey.toLowerCase())
          || item.answer.toLowerCase().includes(filterKey.toLowerCase())
        )
      )
    }
    return filteredQrs
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
        text="Faqs Management"
        noMargin
        button={<Button
          text={userDialogOpen ? 'Cancel' : 'Add FAQ'}
          onClick={() => setuserDialogOpen(!userDialogOpen)}
        />}
      />
      {userDialogOpen ?
        <div className="FormContainer" style={{ justifyContent: 'center' }}>
          <div className="FormInnerContainer">
            <SectionHeading text="FAQ Feilds" />
            <div className="InputsContainer">
              <div className="InputsInnerContainer">
                <SmallTitle text="Question" />
                <Input
                  placeholder={`Type question here`}
                  value={name}
                  onChange={({ target: { value } }) => setname(value)}
                />
              </div>
              <div className="InputsInnerContainer">
                <SmallTitle text="Answer" />
                <Input
                  placeholder={`Type answer here`}
                  value={value}
                  onChange={({ target: { value } }) => setvalue(value)}
                />
              </div>
              <div className="InputsInnerContainer">
                <Button
                  text={'Submit'}
                  light={!!validate() || addingFaq}
                  lightAction={() => {
                    dispatch(customisedAction(SET_TOAST_DISMISSING))
                    dispatch(customisedAction(SET_TOAST, {
                      message: validate() || 'Adding user in progress',
                      type: validate() ? 'error' : 'success'
                    }))
                  }}
                  iconLeft={<i className={`fa fa-${addingFaq ? 'refresh' : 'send'} ${addingFaq ? 'fa-pulse' : ''}`} />}
                  onClick={() => dispatch(customisedAction(ADD_FAQ, { name, value }))}
                />
              </div>
            </div>
          </div>
        </div>
        : <>
          <div className="TabularContentContainer">
            <div className="TableTopContainer">
              <div className="TopLeftContainer">
              </div>
              <div className="TopRightContainer">
                <Input
                  style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
                  placeholder="Search Item (by Name)"
                  value={filterKey}
                  onChange={({ target: { value } }) => {
                    if (value !== '0') {
                      setfilterKey(value)
                      setcurrentIndex(1)
                    }
                  }}
                />
                <i
                  style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
                  className={`fa fa-${filterKey ? 'times-circle' : fetchingGenericData ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
                  onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_GENERIC_DATA))} />
              </div>
            </div>
            <FaqsList
              fetchingGenericData={fetchingGenericData}
              onDelete={onDelete}
              faqs={paginate(getFilteredList())} />
          </div>
            {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ?
              <Pagination
                currentIndex={currentIndex}
                mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
                totalCounts={getFilteredList().length}
                perPageCounts={PER_PAGE_COUNTS}
                onClick={(index) => setcurrentIndex(index)}
              />
              : null}
        </>}
    </div>
  )
}

export default Faqs
