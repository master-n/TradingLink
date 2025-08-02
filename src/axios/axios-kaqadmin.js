import axios from 'axios';
import {getBackEndUrl} from "@/utils/functions";

const instance = axios.create({
    baseURL: getBackEndUrl()
})

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if(error.response){
        if (error.response.status === 401) {
            // localStorage.clear();
            // window.location.href = "login";
        } else if (error.response.status === 500) {
            const errorMessage = error.response.data.message ?
                `Internal server error: ${error.response.data.message}` :
                'An internal server error occurred. Please try again later.';
            return Promise.reject(errorMessage);
        }
    }
    return Promise.reject(error);

});

export default instance;