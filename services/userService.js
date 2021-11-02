import axios from '../axios'

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword
    })
}

const handleRegister = (data) => {
    return axios.post('/api/register', data)
}

const handleLogout = () => {

}

export {
    handleLogin,
    handleRegister,
    handleLogout
}




// export const getAllDoctors = () => {
//     return axios.get("/api/get-all-doctors")
// }

// export const saveDoctorInfoService = (data) => {
//     return axios.post(`/api/save-info-doctors`, data)
// }

// export const getDetailInfoDoctor = (id) => {
//     return axios.get(`/api/get-detail-doctors-by-id?id=${id}`)
// }

// export const saveBulkSchedule = (data) => {
//     return axios.post(`/api/bulk-create-schedule`, data)
// }

// export const getScheduleDoctorByDate = (doctorId, date) => {
//     return axios.get(`/api/get-schedule-doctors-by-date?doctorId=${doctorId}&date=${date}`)
// }

// export const getExtraInfoDoctorById = (id) => {
//     return axios.get(`/api/get-extra-info-doctors-by-id?doctorId=${id}`)
// }

// export const getProfileDoctorById = (id) => {
//     return axios.get(`/api/get-profile-doctors-by-id?doctorId=${id}`)
// }

// export const postBookingAppointment = (data) => {
//     return axios.post(`/api/patient-book-schedule`, data)
// }

// export const postVerifyBooking = (data) => {
//     return axios.post(`/api/verifying-book-appointment`, data)
// }

// export const createNewSpecialty = (data) => {
//     return axios.post(`/api/create-a-new-specialty`, data)
// }

// export const getAllSpecialties = () => {
//     return axios.get("/api/get-all-specialties")
// }

// export const getDetailSpecialtyById = (data) => {
//     return axios.get(`/api/get-detail-specialty-by-id/?id=${data.id}&location=${data.location}`)
// }

// export const createNewClinic = (data) => {
//     return axios.post(`/api/create-a-new-clinic`, data)
// }

// export const getAllClinics = () => {
//     return axios.get("/api/get-all-clinics")
// }

// export const getDetailSpecialtyById = (data) => {
//     return axios.get(`/api/get-detail-specialty-by-id/?id=${data.id}&location=${data.location}`)
// }