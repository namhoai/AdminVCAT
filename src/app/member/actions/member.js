/**
 * Created by namvh on 15/10/2017
 */
import {APP_ID} from '../constants';

import createAction from '../../../share/utils/ActionUtils/createAction';
import createActionNoAppID from '../../../share/utils/ActionUtils/createActionNoAppID';
import createFetchTypes from '../../../share/utils/ActionUtils/createFetchTypes';

export const MEMBER_UI = {
    GET_LIST: 'MEMBER_GET_LIST_UI',
    GET: 'MEMBER_GET_LIST_UI',
    POST: 'MEMBER_POST_UI',
    UPDATE: 'MEMBER_UPDATE_UI',
    REMOVE: 'MEMBER_DELETE_UI'
};

export const MEMBER_API = {
    GET_LIST: createFetchTypes('MEMBER_GET_LIST_API'),
    GET: createFetchTypes('MEMBER_GET_API'),
    POST: createFetchTypes('MEMBER_POST_API'),
    UPDATE: createFetchTypes('MEMBER_UPDATE_API'),
    DELETE_MENBER: createFetchTypes('MEMBER_DELETE_API'),
};

export const MEMBER = {
    ADD_LIST: 'MEMBER_ADD_LIST',
    ADD: 'MEMBER_ADD',
    UPDATE: 'MEMBER_UPDATE',
    DELETE_MENBER: 'MEMBER_DELETE'
};

export const memberUi = {
    getList: (data) => {
        debugger;
        return createAction(APP_ID, MEMBER_UI.GET_LIST, {data});
    },
    get: (payload) => createAction(APP_ID, MEMBER_UI.GET, payload),
    post: (payload) => createAction(APP_ID, MEMBER_UI.POST, payload),
    update: (payload) => createAction(APP_ID, MEMBER_UI.UPDATE, payload),
    deleteMember: (payload) => createAction(APP_ID, MEMBER_UI.REMOVE, payload)
};

export const memberApi = {
    getList: {
        request: (original) => createActionNoAppID(MEMBER_API.GET_LIST.REQUEST, original),
        success: (original, response) => {
            debugger;
            return createActionNoAppID(MEMBER_API.GET_LIST.SUCCESS, response, original);
        },
        failure: (original, error) => createActionNoAppID(MEMBER_API.GET_LIST.FAILURE, error, original),
    },
    get: {
        request: (original) => createActionNoAppID(MEMBER_API.GET.REQUEST, original),
        success: (original, response) => createActionNoAppID(MEMBER_API.GET.SUCCESS, response, original),
        failure: (original, error) => createActionNoAppID(MEMBER_API.GET.FAILURE, error, original),
    },
    update: {
        request: (original) => createActionNoAppID(MEMBER_API.UPDATE.REQUEST, original),
        success: (original, response) => createActionNoAppID(MEMBER_API.UPDATE.SUCCESS, response, original),
        failure: (original, error) => createActionNoAppID(MEMBER_API.UPDATE.FAILURE, error, original),
    },
    post: {
        request: (original) => createActionNoAppID(MEMBER_API.POST.REQUEST, original),
        success: (original, response) => createActionNoAppID(MEMBER_API.POST.SUCCESS, response, original),
        failure: (original, error) => createActionNoAppID(MEMBER_API.POST.FAILURE, error, original),
    },
    deleteMember: {
        request: (original) => createActionNoAppID(MEMBER_API.DELETE_MENBER.REQUEST, original),
        success: (original, response) => createActionNoAppID(MEMBER_API.DELETE_MENBER.SUCCESS, response, original),
        failure: (original, error) => createActionNoAppID(MEMBER_API.DELETE_MENBER.FAILURE, error, original),
    }
};

export const member = {
    addList: (payload) => createActionNoAppID(MEMBER.ADD_LIST, payload),
    add: (payload) => createActionNoAppID(MEMBER.ADD, payload),
    update: (payload) => createActionNoAppID(MEMBER.UPDATE, payload),
    deleteMember: (payload) => createActionNoAppID(MEMBER.DELETE_MENBER, payload),
};
