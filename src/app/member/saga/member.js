/**
 * Created by namvh on 15/10/2017
 */

import {take, call, fork, put, all} from 'redux-saga/effects';
import {MEMBER_API, MEMBER_UI, member as memberReducer, memberApi} from '../actions/member';
import * as functionApi from '../apis/member';
import fetchEntity from '../../../share/utils/SagaUtils/fetchEntity';

/** *** GET LIST DATA ***/
const fetchGetList = fetchEntity.bind(null, memberApi.getList, functionApi.getList);

function* doGetListMember(actionInfo) {
    debugger;
    const original = actionInfo.payload;
    const {data} = original;
    yield call(fetchGetList, original, data);
}

function* watchGetListMember() {
    while(true) {
        const actionInfo = yield take(MEMBER_UI.GET_LIST);
        debugger;
        yield fork(doGetListMember, actionInfo);
    }
}

function* watchGetMemberAfterFetch() {
    while(true) {
        const fetchResult = yield take([MEMBER_API.GET_LIST.FAILURE, MEMBER_API.GET_LIST.SUCCESS]);
        // Neu fetch thanh cong va so luong ban ghi lay duoc > 0 thi dispatch action de cap nhat state
        if (fetchResult.type === MEMBER_API.GET_LIST.SUCCESS) {
            debugger;
            yield put(memberReducer.addList(fetchResult.payload));
        }
        if (fetchResult.type === MEMBER_API.GET_LIST.FAILURE) { /* sonething */
        }
    }
}

/** *** POST A MEMBER ***/
const fetchPost = fetchEntity.bind(null, memberApi.post, functionApi.post);

function* doPostMember(payload) {
    debugger;
    yield call(fetchPost, payload);
}

function* watchPostMember() {
    while(true) {
        const actionInfo = yield take(MEMBER_UI.POST);
        debugger;
        yield fork(doPostMember, actionInfo.payload);
    }
}

function* watchPostMemberAfterFetch() {
    while(true) {
        const fetchResult = yield take([MEMBER_API.POST.FAILURE, MEMBER_API.POST.SUCCESS]);
        // Neu fetch thanh cong va so luong ban ghi lay duoc > 0 thi dispatch action de cap nhat state
        if (fetchResult.type === MEMBER_API.POST.SUCCESS) {
            debugger;
            yield put(memberReducer.add(fetchResult.payload));
        }
        if (fetchResult.type === MEMBER_API.POST.FAILURE) { /* sonething */
        }
    }
}

/** *** UPDATE A MEMBER ***/
const fetchUpdate = fetchEntity.bind(null, memberApi.update, functionApi.update);

function* doUpdateMember(payload) {
    debugger;
    yield call(fetchUpdate, payload);
}

function* watchUpdateMember() {
    while(true) {
        const actionInfo = yield take(MEMBER_UI.UPDATE);
        debugger;
        yield fork(doUpdateMember, actionInfo.payload);
    }
}

function* watchUpdateMemberAfterFetch() {
    while(true) {
        const fetchResult = yield take([MEMBER_API.UPDATE.FAILURE, MEMBER_API.UPDATE.SUCCESS]);
        // Neu fetch thanh cong va so luong ban ghi lay duoc > 0 thi dispatch action de cap nhat state
        if (fetchResult.type === MEMBER_API.UPDATE.SUCCESS) {
            yield put(memberReducer.update(fetchResult.payload));
        }
        if (fetchResult.type === MEMBER_API.UPDATE.FAILURE) { /* sonething */
        }
    }
}

/** *** DELETE A MEMBER ***/
const fetchDelete = fetchEntity.bind(null, memberApi.deleteMember, functionApi.deleteMember);

function* doDeleteMember(payload) {
    debugger;
    yield call(fetchDelete, payload);
}

function* watchDeleteMember() {
    while(true) {
        const actionInfo = yield take(MEMBER_UI.REMOVE);
        debugger;
        yield fork(doDeleteMember, actionInfo.payload);
    }
}

function* watchDeleteMemberAfterFetch() {
    while(true) {
        const fetchResult = yield take([MEMBER_API.DELETE_MENBER.FAILURE, MEMBER_API.DELETE_MENBER.SUCCESS]);
        // Neu fetch thanh cong va so luong ban ghi lay duoc > 0 thi dispatch action de cap nhat state
        if (fetchResult.type === MEMBER_API.DELETE_MENBER.SUCCESS) {
            debugger;
            yield put(memberReducer.deleteMember(fetchResult.payload));
        }
        if (fetchResult.type === MEMBER_API.DELETE_MENBER.FAILURE) { /* sonething */
        }
    }
}

/** *** EXPORT ***/
export function* baseMemberSaga() {
    yield all([
        call(watchGetListMember),
        call(watchGetMemberAfterFetch),
        call(watchPostMember),
        call(watchPostMemberAfterFetch),
        call(watchUpdateMember),
        call(watchUpdateMemberAfterFetch),
        call(watchDeleteMember),
        call(watchDeleteMemberAfterFetch),
    ]);
}
