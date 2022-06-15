import axios from "axios";
import Vue from 'vue';

let HTTP = axios.create({
    baseURL: process.env.MIX_ASSET_URL,
});

const errorInterceptor = (error) => {
    switch (error.response.status) {
        case 401:
            Vue.swal('Error', 'Por favor inicie sesión nuevamente.', 'error');
            window.location.href = process.env.MIX_ASSET_URL + "login";
            break;
        default:
    }
    return Promise.reject(error);
};

const responseInterceptor = (response) => {
    return response;
};

HTTP.interceptors.response.use(responseInterceptor, errorInterceptor);
export default HTTP;
