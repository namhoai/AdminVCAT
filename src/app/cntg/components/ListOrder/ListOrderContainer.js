import {connect} from 'react-redux';

import {moveHouseUi} from '../../actions/moveHouse';
import {getListOrderId} from '../../selecter'
import ListOrder from './ListOrder';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        listItems: getListOrderId(state)
    };
}
// NamVH : tạm thời chưa có server nên dào tạm.

function mapDispatchToProp(dispatch) {
    return {
        getListCNTG: (data) => {
            debugger;
            dispatch(moveHouseUi.getList(data));
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(ListOrder);