

import {ActionUtils} from '../../../share';
import {APP_ID} from '../constants';
const {createAction, createActionNoAppID, createFetchTypes} = ActionUtils;

export const MOVE_HOUSE_UI = {
    GET_LIST: 'MOVE_HOUSE_GET_LIST_UI',
    GET: 'MOVE_HOUSE_GET_LIST_UI',
};

export const MOVE_HOUSE_API = {
    GET_LIST: createFetchTypes('MOVE_HOUSE_GET_LIST_API'),
    GET: createFetchTypes('MOVE_HOUSE_GET_API'),
};

export const MOVE_HOUSE = {
    ADD_LIST: 'CATEGORY_GROUP_ADD_LIST',
    ADD: 'CATEGORY_GROUP_ADD',
};

export const moveHouseUi = {
    getList: (payload) => createAction(APP_ID, MOVE_HOUSE_UI.GET_LIST, payload),
    get: (payload) => createAction(APP_ID, MOVE_HOUSE_UI.GET, payload),
};

export const moveHouseApi = {
    getList: {
        request: (payload) => createActionNoAppID(MOVE_HOUSE_API.GET_LIST.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MOVE_HOUSE_API.GET_LIST.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MOVE_HOUSE_API.GET_LIST.FAILURE, {...payload, error}),
    },
    get: {
        request: (payload) => createActionNoAppID(MOVE_HOUSE_API.GET.REQUEST, {...payload}),
        success: (payload, response) => createActionNoAppID(MOVE_HOUSE_API.GET.SUCCESS, {...payload, response}),
        failure: (payload, error) => createActionNoAppID(MOVE_HOUSE_API.GET.FAILURE, {...payload, error}),
    },
};

export const moveHouse = {
    addList: (payload) => createAction(APP_ID, MOVE_HOUSE.ADD_LIST, payload),
    add: (payload) => createActionNoAppID(MOVE_HOUSE.ADD, payload),
};
