import axios from 'axios';
import{authHeader} from './authService'

const promiseWithErrorHandling = (promise) => {
    return promise.catch(err => {
        if (err.response && err.response.status === 500) {
            // noinspection JSCheckFunctionSignatures
            window.location.assign("/error");
        } else {
            throw err.response;
        }
    });
};

export default {
    get : async (path) => {
        return promiseWithErrorHandling(axios.get(`http://localhost:8080/${path}` , authHeader()));
    },
    post: async (path, payload) => {
        return promiseWithErrorHandling(axios.post(`http://localhost:8080/${path}`, payload, authHeader()));
    },
    delete : async(path) => {
        return promiseWithErrorHandling(axios.delete(`http://localhost:8080/${path}` , authHeader()));
    },
    put : async(path, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}`, payload, authHeader()));
    },
    getWithoutAuth: async (path) => {
        return promiseWithErrorHandling(axios.get(`http://localhost:8080/${path}`));
    },
    postWithoutAuth: async (path,payload) => {
        return promiseWithErrorHandling(axios.post(`http://localhost:8080/${path}`,payload));
    }
}