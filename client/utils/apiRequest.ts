import axios from 'axios';
import {API_URL, BACKEND_BASE_URL} from './apiUrls';
;

export const makeURL = function (URL: string) {
    return API_URL + '/' + URL;
};

export const makeFileURL = function (URL: string) {
    return BACKEND_BASE_URL + URL;

};
const handleErrorResponse = (error: any) => {
    console.error("API Error:", error); // Log the error
    if (error.response) {
        console.error("Error Response:", error.response.data); // Log server-side error details
    } else if (error.request) {
        console.error("No response received:", error.request); // Log client-side network issues
    } else {
        console.error("Error message:", error.message); // Log other types of errors
    }
};
export const getAPI = async function (URL: string, successFn: (data: any) => void, errorFn: (error: any) => void, params = {}) {
    let authHeaders = {
        organization: process.env.NEXT_PUBLIC_ORGANIZATION,
    };
    axios({
        method: "get",
        url: makeURL(URL),
        headers: {
            ...authHeaders,
        },
        params: params,
    })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            handleErrorResponse(error);
            errorFn(error);
        });
};


export const postAPI = async function (URL: string, successFn: (data: any) => void, errorFn: (error: any) => void, data: any) {
    let authHeaders = {
        organization: process.env.NEXT_PUBLIC_ORGANIZATION,
    };
    axios({
        method: "post",
        url: makeURL(URL),
        headers: {
            ...authHeaders,
        },
        data: data,
    })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            handleErrorResponse(error);
            errorFn(error);
        });
};

export const getOuterAPI = async function (URL: string, successFn: (data: any) => void, errorFn: (error: any) => void, params = {}) {
    let authHeaders = {};
    axios({
        method: "get",
        url: URL,
        headers: {
            ...authHeaders,
        },
        params: params,
    })
        .then(function (response) {
            let data = response.data;
            successFn(data);
        })
        .catch(function (error) {
            handleErrorResponse(error);
            errorFn(error);
        });
};