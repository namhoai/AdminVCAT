import { connect } from 'react-redux';
import { getOrderById } from '../../selecter'
import OrderDetail from './OrderDetail';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        item: getOrderById( state, ownProps.orderId + '' )
    };
}

export default connect(mapStateToProp, null)(OrderDetail);