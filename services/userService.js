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

export const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctors-by-id?id=${id}`)
}

export const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctors-by-date?doctorId=${doctorId}&date=${date}`)
}

export const getExtraInfoDoctorById = (id) => {
    return axios.get(`/api/get-extra-info-doctors-by-id?doctorId=${id}`)
}

export const getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctors-by-id?doctorId=${id}`)
}

export const postBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-schedule`, data)
}

export const editUser = (userInfo) => {
    return axios.put('/api/edit-user', userInfo)
}

export const getAllScheduled = (userId) => {
    return axios.post('/api/get-user-schedules', { userId: userId })
}

export const userCancelSchedule = (scheduleId) => {
    return axios.post('/api/user-cancel-schedule', { scheduleId: scheduleId })
}