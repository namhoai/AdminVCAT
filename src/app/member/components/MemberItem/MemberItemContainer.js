/**
 * Created by namvh on 15/10/2017
 */
import {connect} from 'react-redux';
import {getMemberById} from '../../selector/member'
import MemberItem from './MemberItem';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        member: getMemberById(state, ownProps.memberId)
    };
}

export default connect(mapStateToProp, null)(MemberItem);
