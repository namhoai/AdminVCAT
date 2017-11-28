/**
 * Copyright 2016-present, Control Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Control license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author namvu on 18/08/2017.
 *
 * History:
 * @modifier abc on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

import 'whatwg-fetch';
import Cookies from 'js-cookie';
import axios from 'axios';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if(response.status === 204) { // HieuNVb: Response with "No Content"
        return {};
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    // response.ok ~ response.status >= 200 && response.status <= 299
    // if (response.ok) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
    /*
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
    */
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function callApi(url, options) {
    // HieuNVb: Thêm token vào header
    debugger;
    // const token = Cookies.get('token');
    // if (options.headers) {
    //     options.headers.append('Authorization', token);
    // } else {
    //     options.headers = new Headers({'Authorization': token});
    // }

    // Mặc định mode
    options.mode = 'cors';
    const request = new Request(url, options);
    return fetch(request)
        .then(checkStatus)
        .then(parseJSON)
        .then(
            response => ({
                response
            }),
            error => {
                return {error};
            }
        );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function callApiUpload(options) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhZGQiOiJUZXN0NDUwIiwic3ViIjoiVGVzdDQ1MCIsImlzcyI6ImFjY291bnQuc253LmNvbSIsImhvbWUiOiJUZXN0NDUwIiwibmJmIjoxNTA5MzMyNjg0LCJwaG9uZSI6IlRlc3Q0NTAiLCJleHAiOjE1MTc5NzI2ODQsImlhdCI6MTUwOTMzMjY4NCwianRpIjoiZGZkMWUzZDctNTBkYi00ZmQwLTlmZDktMGRlZDA5MjZkMjhlIiwib2JqZWN0SWQiOiI0NTAiLCJhdnQiOiJUZXN0NDUwIiwiZW1haWwiOiJUZXN0NDUwIiwidXNlcm5hbWUiOiJ1c2VyNDUwIn0=.Zvi1RRfqAEJYIk6AyoAbpeWwYvBAlr1lqZhD3kyahGAyfEntcWi5iWqysZCX255YVTdVIvZ8j_dgZOD_j-z2kWMuVKFpMd0A-xF6ej3bttgXsMSCGSLU-39scsb9E8o0PxLY2qC-qOxJLc4jRyTdxz4wjF3vg5ZyvRzeWusm5M_yzbxsaC14TsldmXtPxVqlg-dhYBX5R4pHc8et_dWdZufZi-f1ByJogOgh_5KzGOGNY-fWR3BwReOkZZXBpoRTDCdbYeC2Iv4Ak5ypsqwcBJ83i5bIAKQbXvmq6EGuaCx_IwLqXMtRK4ez6cEIhe_rhx6IP157I5_sQZYOiQ3zVw';
    options.data.append('jwt', token);
    return axios(options)
        .then(response => ({
                response
            }),
            error => {
                return {error};
            });
}

/**
 * Requests a URL, returning a promise
 *
 * @return {object}           The response data
 */
export function callApi2(...args) {
    let url;
    let method;
    let body;
    if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
        method = 'GET';
        url = args[0];
        body = args[1];
    } else if (args.length === 3 && typeof args[1] === 'string' && typeof args[2] === 'object') {
        method = args[0];
        url = args[1];
        body = args[2];
    } else {
        throw 'Gọi hàm callApi với các tham số đầu vào chưa đúng.';
    }
    const options = {
        method: method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({'data': body})
    };
    return callApi(url, options);
}
