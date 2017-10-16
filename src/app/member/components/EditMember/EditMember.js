/**
 * Created by namvh on 15/10/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import { Input, Button, Modal, Card, Row, Col, Upload, Icon, message, Rate, InputNumber } from 'antd';
import './styles/index.less';

const heardFullName = (<div style={{width: 80}}>Họ Và Tên</div>);
const heardPhone = (<div style={{width: 80}}>Số điện thoại</div>);
const heardAddress = (<div style={{width: 80}}>Địa Chỉ</div>);
const hearBirthday = (<div style={{width: 80}}>Năm Sinh</div>);
const hearTotalApply = (<div style={{width: 80}}>Lần Tham Gia</div>);

function getBase64(img, callback) {
    debugger;
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    debugger;
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class EditMember extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        this.state = {
            visible: true,
            member: this.props.member,
        };
    }

    handleChangeInput = (e) => {
        debugger;
        const name = (e.target) ? e.target.name : "level";
        const value = (e.target) ? e.target.value : e;
        debugger;
        const {member} = this.state;
        this.setState({
            member: member.setIn(['data', name], value),
        });
        debugger;

    };

    handleChange = (info) => {
        debugger;
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        debugger;
        const {member} = this.state;
        const memberId = member.getIn(['data', 'id']);
        this.setState({
            visible: false,
        });
        const {addMember} = this.props;
        if (addMember !== undefined) {
            this.props.post(member);
        }else {
            debugger;
            this.props.update({memberId, member});
        }
        this.props.handleEdit(false);
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.handleEdit(false);
    };

    render() {
        debugger;
        const {member, addMember} = this.props;
        const name = member.getIn(['data', 'name']);
        const phone = member.getIn(['data', 'phone']);
        const address = member.getIn(['data', 'address']);
        const avatar = member.getIn(['data', 'avatar']);
        const level = member.getIn(['data', 'level']);
        const totalApply = member.getIn(['data', 'totalApply']);
        const yearBirth = member.getIn(['data', 'yearBirth']);
        const pictureId = member.getIn(['data', 'pictureId']);
        const imageUrl = (avatar) ? avatar : this.state.imageUrl;
        const okText = (addMember) ? "Thêm" : "Chỉnh Sửa";
        return (
            <Modal
                wrapClassName="view-edit-member"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={okText}
                cancelText="Thôi"
            >
                <Row>
                    <Col className="view-edit-member-avatar" span={12}>
                        <Upload
                            className="avatar-uploader"
                            name="avatar"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {
                                imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                        Avatar
                    </Col>
                    <Col span={12}>
                        Thông tin khách hàng
                        <Card className="view-edit-member-info">
                            <div style={{marginBottom: 16}}>
                                <Input
                                    name="name"
                                    onChange={this.handleChangeInput}
                                    addonBefore={heardFullName}
                                    defaultValue={name}
                                />
                            </div>
                            <div style={{marginBottom: 16}}>
                                <Input
                                    name="phone"
                                    onChange={this.handleChangeInput}
                                    addonBefore={heardPhone}
                                    defaultValue={phone}
                                />
                            </div>
                            <div style={{marginBottom: 16}}>
                                <Input
                                    name="address"
                                    onChange={this.handleChangeInput}
                                    addonBefore={heardAddress}
                                    defaultValue={address}
                                />
                            </div>
                            <div style={{marginBottom: 16}}>
                                <Input
                                    addonBefore={hearBirthday}
                                    defaultValue={yearBirth}
                                    name="yearBirth"
                                    onChange={this.handleChangeInput}
                                />
                            </div>
                            <div style={{marginBottom: 16}}>
                                <Input
                                    name="totalApply"
                                    onChange={this.handleChangeInput}
                                    addonBefore={hearTotalApply}
                                    defaultValue={totalApply}
                                />
                            </div>
                            <div style={{marginBottom: 16}}>
                                <Rate
                                    name="level"
                                    onChange={this.handleChangeInput}
                                    allowHalf defaultValue={level}
                                />
                            </div>

                            <div style={{marginBottom: 16}}>
                                PictureId : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Upload>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

EditMember.propTypes = {
    member: PropTypes.object,
    addMember: PropTypes.bool,
    handleEdit: PropTypes.func,
    post: PropTypes.func,
    update: PropTypes.func,
};

EditMember.defaultProps = {
    member: fromJS({
        href: "http://vanchuyenantam.xyz/api/member",
        data: {
            name: "",
            avatar: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
            phone: "",
            address: "",
            pictureId: "",
            level: 0,
            totalApply: 0,
            yearBirth: 0
        }
    })
};

export default EditMember;
