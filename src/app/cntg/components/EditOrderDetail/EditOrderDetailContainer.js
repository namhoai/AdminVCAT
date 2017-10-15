/**
 * Created by namvh on 06/10/2017
 */
import { connect } from 'react-redux';
import { getOrderById } from '../../selector'
import EditOrderDetail from './EditOrderDetail';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        item: getOrderById( state, ownProps.orderId + '' )
    };
}

export default connect(mapStateToProp, null)(EditOrderDetail);