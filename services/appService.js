import axios from '../axios'

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctor = () => {
    return axios.get('/api/get-all-doctors')
}

const getDetailDoctor = (id) => {
    return axios.get('/api/get-detail-doctors-by-id', {
        data: {
            id: id
        }
    })
}

const getTopClinics = (limit) => {
    return axios.get(`/api/get-top-clinics-home?limit=${limit}`)
}

const getAllClinics = () => {
    return axios.get('/api/get-all-clinics')
}

const getDetailClinic = (id) => {
    return axios.get('/api/get-detail-clinic-by-id', {
        data: {
            id: id
        }
    })
}

const getTopSpecialties = (limit) => {
    return axios.get(`/api/get-top-specialties-home?limit=${limit}`)
}

const getAllSpecialties = () => {
    return axios.get('/api/get-all-specialties')
}

const getDetailSpecialty = (id, queryLocation = "ALL") => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${id}&location=${queryLocation}`)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

export {
    getTopDoctorHomeService,
    getTopClinics,
    getTopSpecialties,
    getAllCodeService,
    getAllDoctor,
    getAllSpecialties,
    getAllClinics,
    getDetailDoctor,
    getDetailSpecialty,
    getDetailClinic
}