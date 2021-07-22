import {
    GET_ALL_RESTAURANTS,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    CALL_FOR_SERVICE,
    CALL_FOR_SERVICE_SUCCESS,
    CALL_FOR_SERVICE_FAILURE,
    DONOTDISTURB,
    DONOTDISTURB_SUCCESS,
    DONOTDISTURB_FAILURE,
    GET_GENERIC_DATA_SUCCESS,
} from '../../constants'

export default (state = { genericData: null, fetchingService: false, service: null, fetchingDisturb: false, disturb: null }, { type, payload }) => {
    switch (type) {
        case CALL_FOR_SERVICE:
            return { ...state, fetchingService: true }
        case CALL_FOR_SERVICE_SUCCESS:
            return { ...state, fetchingService: false, service: payload }
        case CALL_FOR_SERVICE_FAILURE:
            return { ...state, fetchingService: false }
        case DONOTDISTURB:
            return { ...state, fetchingDisturb: true }
        case DONOTDISTURB_SUCCESS:
            return { ...state, fetchingDisturb: false, disturb: payload }
        case DONOTDISTURB_FAILURE:
            return { ...state, fetchingDisturb: false }
        case GET_GENERIC_DATA_SUCCESS:
            return { ...state, genericData: payload }
        default:
            return state
    }
}
