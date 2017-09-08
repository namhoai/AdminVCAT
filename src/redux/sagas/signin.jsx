import {
  put,
  call,
  take,
  fork
} from 'redux-saga/effects';

import API from '../../api/index';
import { LOGIN_REQUEST } from '../actions/actionstype';
import { loginSuccess, loginFailure } from '../actions/user';

function login(data) {
  return API.getLoginResource(data);
}

function* loginRequest(data) {
    debugger;
  try {
    const response = yield call(login, data);
    debugger;
    if (response.data.code === 200) {
      let isAdmin = false;
      if (data.username.toLowerCase() === 'admin') {
        isAdmin = true;
      }
      yield put(loginSuccess(response.data.data.token, isAdmin, data.username));
    } else {
      let msg=response.data.msg;
      yield put(loginFailure({
        code: response.data.code,
        msg
      }));
    }
  } catch(e) {
    yield put(loginFailure({
        code: 404,
        msg: 'not connet network !'
    }));
  }
}

export function* signin() {
  while (true) {
    const resData = yield take(LOGIN_REQUEST);
    yield fork(loginRequest, resData.payload);
  }
}

