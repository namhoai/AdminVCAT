import { APP_ID } from '../contants'

export const getListOrderId = (state) => state[APP_ID].getIn(['listItems']);
export const getOrderById = (state, orderId) => state[APP_ID].getIn(['items', orderId]);
