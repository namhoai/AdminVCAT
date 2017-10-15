/**
 * Created by namvh on 15/10/2017
 */
import {connect} from 'react-redux';
import {memberUi} from '../../actions/member';
import {getMemberById} from '../../selector/member'
import EditMember from './EditMember';

function mapStateToProp(state, ownProps) {
    debugger;
    return {
        member: getMemberById(state, ownProps.memberId)
    };
}

function mapDispatchToProp(dispatch) {
    return {
        post : (member) => dispatch(memberUi.post(member)),
        update : (member) => dispatch(memberUi.update(member)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(EditMember);
