import axios from 'axios';


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
        return promiseWithErrorHandling(axios.get(`http://localhost:8080/${path}`));
    }
}