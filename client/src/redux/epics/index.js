import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'

export const epics = combineEpics(
    loginEpic.login,
)
