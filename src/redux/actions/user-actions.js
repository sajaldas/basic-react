const LOGIN_SUCCESS = "login_success";
const LOGOUT_SUCCESS = "logout_success"

export const actionTypes = {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
}

export function loginSuccess(payload){
    return {
        type : LOGIN_SUCCESS,
        payload: payload
    }
}

export function logoutSuccess(payload){
    return {
        type : LOGOUT_SUCCESS
    }
}

