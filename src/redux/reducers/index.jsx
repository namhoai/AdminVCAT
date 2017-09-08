import { combineReducers } from 'redux';
import userReducer from './user';
import menuReducer from './menu';
import cntg from '../../app/cntg/reducers/data';

const rootReducer = combineReducers({
    userReducer,
    menuReducer,
    cntg
});
export default rootReducer;
