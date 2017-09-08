import { GET_DATA_CNTG } from '../actions/actionstype.js';
import { response } from './data.default';
import { fromJS } from 'immutable';

const cntg = (state = fromJS(response), action) => {
    switch (action.type) {
        case GET_DATA_CNTG:
            return {
                ...state,
                menuFold: action.payload
            };
        default:
            return state;
    }
};

export default cntg;
