
import { put, call, cancelled } from 'redux-saga/effects';

/**
 * Hàm mẫu chứa kịch bản truy vấn tới server chung
 *
 * @param {object} entity Action callback when doing fetching
 * @param {function} apiFn Ham goi Api cua server
 * @param {string} args Du lieu can gui len server
 * @return {boolean} Whether something occurred.
 */
export default function* fetchEntity(entity, apiFn, ...args) {
    try {
        // TODO by CuongNT: chuyen ...args thanh request => Dam bao yeu cau goc duoc dong goi trong thuoc tinh request
        yield put(entity.request(...args));
        const {response, error} = yield call(apiFn, ...args);
        // success
        if(response) {
            yield put(entity.success(...args, response));
            return response;
        }
        // failure
        yield put(entity.failure(...args, error));
        return error;
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}
