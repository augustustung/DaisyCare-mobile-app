import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isLoading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROCESS_ACTIONS:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                isLoading: false
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_ACTION_FAILED: {
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            return state;
    }
}

export default userReducer;