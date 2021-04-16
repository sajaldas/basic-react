import { actionTypes } from '../actions/user-actions'

const initialState = {
    user: {},
    isUserLoggedIn: false
  };

export default function userReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                user: payload
            }
        case actionTypes.LOGOUT_SUCCESS:
            return initialState
        default:
            return state
    }
}