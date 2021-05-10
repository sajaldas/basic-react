import { actionTypes } from '../actions/user-actions'

const initialState = {
    userDetail: {},
    isUserLoggedIn: false
  };

export default function userReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                userDetail: payload
            }
        case actionTypes.LOGOUT_SUCCESS:
            return initialState
        default:
            return state
    }
}