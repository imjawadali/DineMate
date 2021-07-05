import { RestClient } from '../../services/network'
import { customisedAction } from '../actions'

import store from '../store'
import { LOGOUT, SESSION_CHECK_DONE } from '../../constants'
import { removeItem } from '../../helpers'

export const generalizedEpic = async (method, url, data, successCallback, failureAction, noToast) => {
    try {
        let response
        if (method === 'get') {
            response = await RestClient.get(url)
        } else response = await RestClient.post(url, data)
        const { status, data: resObj, problem } = response
        if (status && status === 200) {
          const { status: ok, errorCode, message } = resObj
          if (ok)
            return successCallback(resObj)
          else {
            if (errorCode === 401) {
              removeItem('customer')
              store.dispatch(customisedAction(LOGOUT))
              store.dispatch(customisedAction(SESSION_CHECK_DONE))
            }
            return customisedAction(failureAction, noToast ? null : { message, type: 'error' })
          }
        }
        if (problem && problem === 'NETWORK_ERROR') {
          return customisedAction(failureAction, noToast ? null : { message: `Network Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
        }
        if (problem && problem === 'TIMEOUT_ERROR') {
          return customisedAction(failureAction, noToast ? null : { message: `Timeout Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
        }
        return customisedAction(failureAction, noToast ? null : { message: `Unknown Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
    } catch (error) {
        // console.log(`${failureAction.replace('_FAILURE', '')} Unknown Error`, error)
        return customisedAction(failureAction, noToast ? null : { message: error.message, type: 'error' })
    }
}