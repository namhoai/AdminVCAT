import { connect } from 'react-redux';
import { getListOrderId } from '../../selecter'
import ListOrder from './ListOrder';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        listItems: getListOrderId(state)
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

export default connect(mapStateToProp, null)(ListOrder);