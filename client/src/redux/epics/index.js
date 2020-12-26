import { combineEpics } from 'redux-observable';
import { defaultEpic } from './defaultEpic'

export const epics = combineEpics(
    defaultEpic.default,
);
