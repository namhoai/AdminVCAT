// saga Modular introduction
import { fork, all } from 'redux-saga/effects';

// Asynchronous logic
import { signin } from './signin';
import { signout } from './signout';
import { fetchData } from './fetchdata';
import { baseMoveHouseSaga } from '../../app/cntg/saga/moveHouse';
import { baseMemberSaga } from '../../app/member/saga/member';

// Single entry point, start all at once Saga
export default function* rootSaga() {
  yield all([
      fork(signin),
      fork(signout),
      fork(fetchData),
      fork(baseMoveHouseSaga),
      fork(baseMemberSaga),
  ]);
}
