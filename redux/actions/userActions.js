import actionTypes from './actionTypes';

export const processAction = () => ({
    type: actionTypes.PROCESS_ACTIONS
})

export const loginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: userInfo
})

export const processActionFailed = () => ({
    type: actionTypes.PROCESS_ACTION_FAILED
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const updateUserInfo = (payload) => ({
    type: actionTypes.UPDATE_USER_INFO,
    payload: payload
})