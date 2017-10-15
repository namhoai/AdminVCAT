import { combineReducers } from 'redux';
import userReducer from './user';
import menuReducer from './menu';
import cntg from '../../app/cntg/reducers/data';
import member from '../../app/member/reducers/member';

const rootReducer = combineReducers({
    userReducer,
    menuReducer,
    cntg,
    member
});
export default rootReducer;
