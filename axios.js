import axios from 'axios';

const instance = axios.create({
    baseURL: "https://daisycare-backend.herokuapp.com",
    headers: {
        origin: "asfasfsfdaylamobileappguireqfsfddssfsfsdddeue^s##t123123123123123123123123123"
    }
});

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return data;
    },
);

export default instance;