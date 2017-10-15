/**
 * Created by namvh on 15/10/2017
 */
import React from 'react';
import PropTypes from 'prop-types';
import MemberItemContainer from '../MemberItem/MemberItemContainer';
import EditMemberContainer from '../EditMember/EditMemberContainer';
import { Button, Card, Col, Row } from 'antd';
import './styles/index.less';

class MemberList extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {visibleEdit: false}
    }

    handleEdit = (visible) => {
        const element = (visible === undefined) ? !this.state.visibleEdit : visible;
        debugger;
        this.setState({
            visibleEdit: element,
        })
    };

    componentWillMount() {
        // Todo : đoạn này đang fix tạm. -> Sau này sẽ xử lý sau.
        const data = {
            page : 0,
            pageSize: 5
        };
        debugger;
        this.props.getListMember(data);
    }

    render() {
        debugger;
        const {memberIds} = this.props;
        return (
            <div className="member-list">
                <Row gutter={16}>
                    {
                        <Col span={8} className="member-list-add">
                            <Card style={{height: 126}}>
                                <Button onClick={this.handleEdit} shape="circle" icon="plus" />
                            </Card>
                        </Col>
                    }
                    {
                        memberIds && memberIds.map((memberId) => {
                            return (
                                <Col span={8}>
                                    <MemberItemContainer memberId={memberId}/>
                                </Col>
                            )
                        })
                    }
                    {
                        this.state.visibleEdit &&
                        <EditMemberContainer addMember handleEdit={this.handleEdit}/>
                    }
                </Row>
            </div>
        );
    }
}

MemberList.propTypes = {
    memberIds: PropTypes.object,
    getListMember: PropTypes.func,
};

export default MemberList;
