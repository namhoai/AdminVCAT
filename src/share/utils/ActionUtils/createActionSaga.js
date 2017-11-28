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

import createAction from './createAction';

function createActionSaga(types) {
    return {
        request: (...args) => createAction(types.REQUEST, ...args),
        success: (...args) => createAction(types.SUCCESS, ...args),
        failure: (...args) => createAction(types.FAILURE, ...args),
    };
}

export default createActionSaga;
