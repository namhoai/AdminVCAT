
import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    // console.log('parseJSON: ', response);
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
    // console.log('checkStatus: ', response);
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
