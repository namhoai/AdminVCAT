import { connect } from 'react-redux';
import { getOrderById } from '../../selecter'
import OrderItem from './OrderItem';

function mapStateToProp(state, ownProps) {
    return {
        item: getOrderById( state, ownProps.orderId )
    };
}
// NamVH : tạm thời chưa có server nên dào tạm.

// function mapDispatchToProp(dispatch) {
//     return {
//         login: (data) => {
//             dispatch(loginRequest(data));
//         }
//     };
// }

export default connect(mapStateToProp, null)(OrderItem);