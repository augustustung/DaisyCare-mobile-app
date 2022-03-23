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
    allDoctor: [],
    genders: []
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
                allSpecialty: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_ALL_CLINIC:
            console.log('is loadgasg');
            console.log(state);
            return {
                ...state,
                allClinic: action.payload,
                isLoading: false
            }
        case actionTypes.PROCESS_APP_ACTIONS_FAILED:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

export default appReducer