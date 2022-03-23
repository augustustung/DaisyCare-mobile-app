import actionTypes from './actionTypes';
import * as FUNCTION from '../../services'
import Toast from 'react-native-toast-message';

const fetchHomeData = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_APP_ACTIONS })

        const resDoctor = await FUNCTION.getTopDoctorHomeService(8)
        const resSpecialty = await FUNCTION.getTopSpecialties(8)
        const resClinic = await FUNCTION.getTopClinics(8)
        if (
            resDoctor && resDoctor.errCode === 0
            && resSpecialty && resSpecialty.errCode === 0
            && resClinic && resClinic.errCode === 0
        ) {
            dispatch({
                type: actionTypes.FETCH_HOME_DATA_SUCCESS,
                payload: {
                    topDoctor: resDoctor.data,
                    topClinic: resClinic.data,
                    topSpecialty: resSpecialty.data
                }
            })
        } else {
            dispatch({ type: actionTypes.PROCESS_APP_ACTIONS_FAILED })
            Toast.show({
                text1: "Error",
                text2: "Có lỗi xảy ra. Vui lòng thử lại sau"
            })
        }
    }
}

const fetchAllSpecialty = () => {
    return async dispatch => {
        const resSpecialty = await FUNCTION.getAllSpecialties()
        if (resSpecialty && resSpecialty.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
                payload: resSpecialty.data
            })
        } else {
            Toast.show({
                text1: "Error",
                text2: "Có lỗi xảy ra. Vui lòng thử lại sau"
            })
        }
    }
}

const fetchAllDoctor = () => {
    return async dispatch => {
        const resDoctor = await FUNCTION.getAllDoctor()
        if (resDoctor && resDoctor.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                payload: resDoctor.data
            })
        } else {
            Toast.show({
                text1: "Error",
                text2: "Có lỗi xảy ra. Vui lòng thử lại sau"
            })
        }
    }
}

const fetchAllClinic = () => {
    return async dispatch => {
        const resClinic = await FUNCTION.getAllClinics()
        if (resClinic && resClinic.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_ALL_CLINIC,
                payload: resClinic.data
            })
        } else {
            Toast.show({
                text1: "Error",
                text2: "Có lỗi xảy ra. Vui lòng thử lại sau"
            })
        }
    }
}


export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.FETCH_INFO_START
            })

            let res = await FUNCTION.getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCESS,
                    payload: res.data
                })
            }
        } catch (e) {
            console.log("Fetch data failed", e)
        }
    }
}

export {
    fetchHomeData,
    fetchAllSpecialty,
    fetchAllDoctor,
    fetchAllClinic
}