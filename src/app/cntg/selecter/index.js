import { APP_ID } from '../constants'

const getListOrderId = (state) => {
    debugger;
    return state[APP_ID].getIn(['listItems']);
};

const getOrderById = (state, orderId) => {
    debugger;
    return state[APP_ID].getIn(['items', orderId]);
};

export {
    getListOrderId,
    getOrderById
};