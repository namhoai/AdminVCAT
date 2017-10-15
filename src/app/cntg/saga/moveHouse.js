
import {take, call, fork, put, all} from 'redux-saga/effects';
import {MOVE_HOUSE_API, MOVE_HOUSE_UI, moveHouse as moveHouseReducer, moveHouseApi} from '../actions/moveHouse';
import * as functionApi from '../apis/moveHouse';
import { SagaUtils } from '../../../share';

const {fetchEntity} = SagaUtils;

/** *** GET LIST DATA ***/
const fetchGetList = fetchEntity.bind(null, moveHouseApi.getList, functionApi.getList);

function* doGetListData(payload) {
    debugger;
    yield call(fetchGetList, payload);
}

function* watchGetListData() {
    while(true) {
        const actionInfo = yield take(MOVE_HOUSE_UI.GET_LIST);
        debugger;
        yield fork(doGetListData, actionInfo.payload);
    }
}

function* watchGetDataAfterFetch() {
    while(true) {
        const fetchResult = yield take([MOVE_HOUSE_API.GET_LIST.FAILURE, MOVE_HOUSE_API.GET_LIST.SUCCESS]);
        // Neu fetch thanh cong va so luong ban ghi lay duoc > 0 thi dispatch action de cap nhat state
        if (fetchResult.type === MOVE_HOUSE_API.GET_LIST.SUCCESS) {
            yield put(moveHouseReducer.addList(fetchResult.payload));
        }
        if (fetchResult.type === MOVE_HOUSE_API.GET_LIST.FAILURE) { /* sonething */
        }
    }
}

/** *** EXPORT ***/
export function* baseMoveHouseSaga() {
    yield all([
        call(watchGetListData),
        call(watchGetDataAfterFetch),
    ]);
}
