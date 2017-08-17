// saga Modular introduction
import { fork, all } from 'redux-saga/effects';

// Asynchronous logic
import { signin } from './signin';
import { signout } from './signout';
import { fetchData } from './fetchdata';

// Single entry point, start all at once Saga
export default function* rootSaga() {
  yield all([fork(signin), fork(signout), fork(fetchData)]);
}
