import {fromJS} from 'immutable';
import {ReducerUtils} from '../../../share';
import {MOVE_HOUSE} from '../actions/moveHouse';

const addList = (state, action) => {
    const {response} = action.payload;
    debugger;
    return state.merge(fromJS(response));
};

const cntg = ReducerUtils.createReducer(fromJS({}), {
    [MOVE_HOUSE.ADD_LIST]: addList,
});

export default cntg;

