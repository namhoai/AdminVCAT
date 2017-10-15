/**
 * Created by namvh on 15/10/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Rate, Card, Badge, Popconfirm, message} from 'antd';
import EditMemberContainer from '../EditMember/EditMemberContainer';
import './styles/index.less';

function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
}

function cancel(e) {
}

class MemberItem extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        this.state = {
            visible: false,
            visibleEdit: false
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit = (visible) => {
        const element = (visible === undefined) ? !this.state.visibleEdit : visible;
        debugger;
        this.setState({
            visibleEdit: element,
        })
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        // NamVH
        debugger;
        const {member, memberId} = this.props;
        const name = member.getIn(['data', 'name']);
        const phone = member.getIn(['data', 'phone']);
        const address = member.getIn(['data', 'address']);
        const avatar = member.getIn(['data', 'avatar']);
        const pictureId = member.getIn(['data', 'pictureId']);
        const totalApply = member.getIn(['data', 'totalApply']);
        const level = member.getIn(['data', 'level']);

        return (
            <div>
                <Card>
                    <div className="member-item-info">
                        <div className="member-item-info-left" >
                            <img width="75px" height="75px" src={avatar} alt={name} />
                        </div>
                        <div className="member-item-info-right">
                            <div>phone : {phone}</div>
                            <div>address : {address}</div>
                            <div>
                                <img onClick={this.showModal} width="40px" height="20px" src={pictureId} alt={name} />
                            </div>
                        </div>
                        <Rate disabled value={level} />
                    </div>
                    <div className="member-item-name">{name}</div>
                    <Button onClick={this.handleEdit} className="member-item-edit" type="primary" shape="circle" icon="edit" />
                    <div className="member-item-toolbar">
                        <ul>
                            <li>
                                <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                                    <Button shape="circle" type="danger" icon="close" />
                                </Popconfirm>
                            </li>
                        </ul>
                    </div>
                    {
                        (totalApply !== 0) &&
                        <span className="member-item-achievements">
                            <Badge count={totalApply} style={{backgroundColor: '#87d068'}} />
                        </span>
                    }
                </Card>
                <Modal
                    wrapClassName="view-pictureId"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                >
                    <img width="550px" src={pictureId} alt={name} />
                </Modal>
                {
                    this.state.visibleEdit &&
                    <EditMemberContainer memberId={memberId} handleEdit={this.handleEdit}/>
                }
            </div>
        );
    }
}

MemberItem.propTypes = {
    member: PropTypes.object,
    memberId: PropTypes.string,
};

export default MemberItem;
