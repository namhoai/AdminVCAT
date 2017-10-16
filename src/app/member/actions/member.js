/**
 * Created by namvh on 15/10/2017
 */
import {ActionUtils} from '../../../share';
import {APP_ID} from '../constants';
const {createAction, createActionNoAppID, createFetchTypes} = ActionUtils;

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
    DELETE: createFetchTypes('MEMBER_DELETE_API'),
};

export const MEMBER = {
    ADD_LIST: 'MEMBER_ADD_LIST',
    ADD: 'MEMBER_ADD',
    UPDATE: 'MEMBER_UPDATE',
    DELETE: 'MEMBER_DELETE'
};

export const memberUi = {
    getList: (payload) => createAction(APP_ID, MEMBER_UI.GET_LIST, payload),
    get: (payload) => createAction(APP_ID, MEMBER_UI.GET, payload),
    post: (payload) => createAction(APP_ID, MEMBER_UI.POST, payload),
    update: (payload) => createAction(APP_ID, MEMBER_UI.UPDATE, payload),
    delete: (payload) => createAction(APP_ID, MEMBER_UI.REMOVE, payload)
};

export const memberApi = {
    getList: {
        request: (payload) => createActionNoAppID(MEMBER_API.GET_LIST.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MEMBER_API.GET_LIST.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MEMBER_API.GET_LIST.FAILURE, {...payload, error}),
    },
    get: {
        request: (payload) => createActionNoAppID(MEMBER_API.GET.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MEMBER_API.GET.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MEMBER_API.GET.FAILURE, {...payload, error}),
    },
    update: {
        request: (payload) => createActionNoAppID(MEMBER_API.UPDATE.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MEMBER_API.UPDATE.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MEMBER_API.UPDATE.FAILURE, {...payload, error}),
    },
    post: {
        request: (payload) => createActionNoAppID(MEMBER_API.POST.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MEMBER_API.POST.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MEMBER_API.POST.FAILURE, {...payload, error}),
    },
    deleteMember: {
        request: (payload) => createActionNoAppID(MEMBER_API.DELETE.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MEMBER_API.DELETE.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MEMBER_API.DELETE.FAILURE, {...payload, error}),
    }
};

export const member = {
    addList: (payload) => createActionNoAppID(MEMBER.ADD_LIST, payload),
    add: (payload) => createActionNoAppID(MEMBER.ADD, payload),
    update: (payload) => createActionNoAppID(MEMBER.UPDATE, payload),
    deleteMember: (payload) => createActionNoAppID(MEMBER.DELETE, payload),
};
