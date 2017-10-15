/**
 * Created by namvh on 15/10/2017
 */
import {APP_ID} from '../constants'

export const getListMemberId = (state) => {
    debugger;
    return state['member'].getIn(['memberIds']);
};

export const getMemberById = (state, orderId) => {
    debugger;
    return state['member'].getIn(['members', orderId + '']);
};
