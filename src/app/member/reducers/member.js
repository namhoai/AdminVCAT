/**
 * Created by namvh on 15/10/2017
 */
import {fromJS} from 'immutable';
import createReducer from '../../../share/utils/ReducerUtils/createReducer';
import {MEMBER} from '../actions/member';

const add = (state, action) => {
    const {response} = action.payload;
    const memberTemp = fromJS(response);
    return state.withMutations(st => {
        st.updateIn(['memberIds'], (memberIds) => memberIds.push(response.data.id));
        st.updateIn(['members', response.data.id + ''], (member = memberTemp) => member);
    })
};

const addList = (state, action) => {
    debugger;
    const response = action.payload;
    return state.merge(fromJS(response));
};

const update = (state, action) => {
    const {member, memberId} = action.payload;
    debugger;
    return state.setIn(['members', memberId + ''], member);
};

const deleteMember = (state, action) => {
    const {memberId} = action.payload;
    debugger;
    return state.withMutations (st => {
        st.deleteIn(['members', memberId + '']);
        st.updateIn(['memberIds'], member => member.delete(member.indexOf(memberId)));
    })
};

const member = createReducer(fromJS({}), {
    [MEMBER.ADD_LIST]: addList,
    [MEMBER.ADD]: add,
    [MEMBER.UPDATE]: update,
    [MEMBER.DELETE]: deleteMember,
});

export default member;
