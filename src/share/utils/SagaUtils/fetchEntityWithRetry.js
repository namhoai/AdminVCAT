/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 11/09/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

import {delay} from 'redux-saga';
import {put, call, cancelled} from 'redux-saga/effects';

// TODO : Retrying XMR calls: https://redux-saga.js.org/docs/recipes/
/**
 * Hàm mẫu chứa kịch bản truy vấn tới server chung
 *
 * @param {object} entity Action callback when doing fetching
 * @param {function} apiFn Ham goi Api cua server
 * @param {string} args Du lieu can gui len server
 * @return {boolean} Whether something occurred.
 */
export default function* fetchEntityWithRetry(retryTimes, delayTimes, entity, apiFn, ...args) {
    try {
        // TODO : chuyen ...args thanh request => Dam bao yeu cau goc duoc dong goi trong thuoc tinh request
        yield put(entity.request(...args));
        let result;
        let resultErr;
        for(let i = 0; i < retryTimes; i++) {
            try {
                result = yield call(apiFn, ...args);
            } catch(err) {
                resultErr = err;
                if(i < retryTimes - 1) {
                    yield call(delay, delayTimes);
                }
            }
        }
        const {response, error} = result || {error: resultErr};
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
