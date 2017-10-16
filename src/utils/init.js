import { setMenuFold } from '../redux/actions/menu';
import { loginSuccess } from '../redux/actions/user';

export const init = (store) => {
  const token = localStorage.token;
  const isAdmin = localStorage.isAdmin === 'true' ? true : false;

  if (token) {
    store.dispatch(loginSuccess(token, isAdmin, localStorage.userName));
  }
  if (localStorage.menuFold) {
    store.dispatch(setMenuFold(localStorage.menuFold === 'true' ? true : false));
  }
};
