/* eslint-disable import/named */
import { create } from 'apisauce'
import { BASE_URL } from '../../constants'

// Rest Client for Americamp APIs
export const RestClient = create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    Authorization: '',
  },
  timeout: 60000,
})
