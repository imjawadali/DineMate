import { SET_SESSION } from '../../constants'

export default (state = { user: null, admin: null }, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, user: payload.user, admin: payload.admin }
    default:
      return state;
  }
};
