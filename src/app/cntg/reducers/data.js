import {fromJS} from 'immutable';
import createReducer from '../../../share/utils/ReducerUtils/createReducer';
import {MOVE_HOUSE} from '../actions/moveHouse';

const addList = (state, action) => {
    const {response} = action.payload;
    debugger;
    return state.merge(fromJS(response));
};

const cntg = createReducer(fromJS({}), {
    [MOVE_HOUSE.ADD_LIST]: addList,
});

export default cntg;

