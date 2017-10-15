/**
 * Created by namvh on 15/10/2017
 */
import {connect} from 'react-redux';

import {memberUi} from '../../actions/member';
import {getListMemberId} from '../../selector/member'
import MemberList from './MemberList';

function mapStateToProp(state) {
    debugger;
    return {
        memberIds: getListMemberId(state)
    };
}

function mapDispatchToProp(dispatch) {
    return {
        getListMember : (data) => dispatch(memberUi.getList(data)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(MemberList);