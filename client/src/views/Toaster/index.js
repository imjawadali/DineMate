import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { customisedAction } from '../../redux/actions'
import { RESET_TOAST } from '../../constants/App'

function Toaster() {
  const toast = useSelector(({ toastReducer }) => toastReducer.toast)
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  useEffect(() => {
    if (toast) {
      addToast(toast.message, { appearance: toast.type })
      dispatch(customisedAction(RESET_TOAST))
    }
  }, [toast, addToast, dispatch])

  return (
    <div />
  )
}

export default Toaster
