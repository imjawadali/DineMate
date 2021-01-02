import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { customisedAction } from '../../redux/actions'
import { RESET_TOAST, SET_TOAST_DISMISSING } from '../../constants'

function Toaster() {
  const toast = useSelector(({ toastReducer }) => toastReducer.toast)
  const toastSetDismiss = useSelector(({ toastReducer }) => toastReducer.toastSetDismiss)
  const dispatch = useDispatch()
  const { addToast, removeAllToasts } = useToasts()

  useEffect(() => {
    if (toast) {
      addToast(toast.message, { appearance: toast.type })
      dispatch(customisedAction(RESET_TOAST))
    }
    if (toastSetDismiss) {
      removeAllToasts()
      dispatch(customisedAction(SET_TOAST_DISMISSING, false))
    }
  }, [toast, addToast, toastSetDismiss, removeAllToasts, dispatch])

  return (
    <div />
  )
}

export default Toaster
