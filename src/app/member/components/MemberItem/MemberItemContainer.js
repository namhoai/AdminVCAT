/**
 * Created by namvh on 15/10/2017
 */
import {connect} from 'react-redux';
import {getMemberById} from '../../selector/member';
import {memberUi} from '../../actions/member';
import MemberItem from './MemberItem';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        member: getMemberById(state, ownProps.memberId)
    };
}

function mapDispatchToProp(dispatch) {
    return {
        deleteMember : (member) => dispatch(memberUi.delete(member)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(MemberItem);
