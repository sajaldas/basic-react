import { actionTypes } from '../actions/user-actions'

export default function userReducer(state = {}, action) {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                user: payload
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: false
            }
        default:
            return state
    }
}