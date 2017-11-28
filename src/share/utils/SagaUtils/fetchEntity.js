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

import {put, call, cancelled} from 'redux-saga/effects';

/**
 * Hàm mẫu chứa kịch bản truy vấn tới server chung
 *
 * @param {object} entity Action callback when doing fetching
 * @param {function} apiFn Ham goi Api cua server
 * @param {string} args Du lieu can gui len server
 * @return {boolean} Whether something occurred.
 */
export default function* fetchEntity(entity, apiFn, original, ...args) {
    try {
        // TODO by CuongNT: chuyen ...args thanh request => Dam bao yeu cau goc duoc dong goi trong thuoc tinh request
        yield put(entity.request(original));
        // TODO by CuongNT: Retrying XMR calls: https://redux-saga.js.org/docs/recipes/
        const {response, error} = yield call(apiFn, ...args);
        // Goi ham callback cua component LoadMore de dung trang thai dang loading
        if (original && original.getDataFinishFn && typeof original.getDataFinishFn === 'function') {
            yield original.getDataFinishFn();
        }
        // success
        if (response) {
            // Added DamBV: Cho phep thuc hien callback khi lay du lieu thanh cong.
            if (original && original.getSuccessDataFinishFn && typeof original.getSuccessDataFinishFn === 'function') {
                yield original.getSuccessDataFinishFn(original, response);
            }
            yield put(entity.success(original, response));
            return response;
        }

        // failure
        yield put(entity.failure(original, error));
        // Added DamBV: Cho phep thuc hien callback khi lay du lieu xay ra loi.
        if (original && original.getErrorDataFinishFn && original.getErrorDataFinishFn === 'function') {
            yield original.getErrorDataFinishFn(original);
        }
        return error;

    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}
