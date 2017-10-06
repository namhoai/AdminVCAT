//NamVh

import createAction from './createAction';

function createActionSaga(types) {
    return {
        request: (...args) => createAction(types.REQUEST, ...args),
        success: (...args) => createAction(types.SUCCESS, ...args),
        failure: (...args) => createAction(types.FAILURE, ...args),
    };
}

export default createActionSaga;
