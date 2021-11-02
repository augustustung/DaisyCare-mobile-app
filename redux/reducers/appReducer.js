import actionTypes from '../actions/actionTypes'

const initialState = {
    homeData: {
        topDoctor: [],
        topClinic: [],
        topSpecialty: []
    },
    isLoading: false,
    allSpecialty: [],
    allClinic: [],
    allDoctor: []
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROCESS_APP_ACTIONS:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_HOME_DATA_SUCCESS:
            return {
                ...state,
                homeData: {
                    topDoctor: action.payload.topDoctor,
                    topClinic: action.payload.topClinic,
                    topSpecialty: action.payload.topSpecialty
                },
                isLoading: false
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            return {
                ...state,
                allSpecialty: action.payload
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.payload
            }
        case actionTypes.FETCH_ALL_CLINIC:
            return {
                ...state,
                allClinic: action.payload
            }
        case actionTypes.PROCESS_APP_ACTIONS_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default appReducer