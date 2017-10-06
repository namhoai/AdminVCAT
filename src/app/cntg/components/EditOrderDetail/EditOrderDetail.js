/**
 * Created by namvh on 06/10/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Row,
    Col,
    Avatar,
    TimePicker,
    Button,
    Popover,
    Modal,
    Switch,
    Input,
    Icon,
    Select,
    DatePicker
} from 'antd';
import moment from 'moment';

const Option = Select.Option;
const {TextArea} = Input;
const {MonthPicker, RangePicker} = DatePicker;

const heardFullName = (<div style={{width: 80}}>Họ Và Tên</div>);
const heardPhone = (<div style={{width: 80}}>Số điện thoại</div>);
const heardGmail = (<div style={{width: 80}}>Gmail</div>);
const heardCost = (<div style={{width: 80}}>Giá</div>);

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class EditOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {visible: this.props.visible}
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        const {item} = this.props;
        debugger;
        this.props.handleOnChangeShow(true);
    };

    handleCancel = (e) => {
        console.log(e);
        this.props.handleOnChangeShow(true);
    };

    handleChangeMember = (value) => {
        console.log(`selected ${value}`);
    };
    onChangeDateMove = (date, dateString) => {
        console.log(date, dateString);
    };

    render() {
        const {item} = this.props;
        const fullName = item.getIn(['user', 'name']);
        const phone = item.getIn(['user', 'phone']);
        const cost = item.getIn(['order', 'cost']);
        const note = item.getIn(['order', 'note']);
        const toMove = item.getIn(['order', 'toMove']);
        const fromMove = item.getIn(['order', 'fromMove']);
        const gmail = item.getIn(['user', 'gmail']);
        const tick = (item.get('tick') === 1);
        debugger;
        return (
            <div>
                <Modal
                    title="Thông tin đơn hàng"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Chỉnh sửa"
                    cancelText="Hủy bỏ"
                >
                    <Row>
                        <Col span={12}>
                            Thông tin khách hàng
                            <Card className="info-user">
                                <div style={{marginBottom: 16}}>
                                    <Input addonBefore={heardFullName} defaultValue={fullName}/>
                                </div>
                                <div style={{marginBottom: 16}}>
                                    <Input addonBefore={heardPhone} defaultValue={phone}/>
                                </div>
                                <div>
                                    <Input addonBefore={heardGmail} defaultValue={gmail}/>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            Thông tin nguời vận chuyển
                            <Card className="info-user edit-member" style={{height: 166}}>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Thêm thành viên"
                                    defaultValue={[]}
                                    onChange={this.handleChangeMember}
                                >
                                    {children}
                                </Select>
                            </Card>
                        </Col>
                    </Row>
                    <div>

                    </div>
                    <br/>
                    Thông tin đơn hàng
                    <Card>
                        <Row>
                            <Col className="col-span-12" span={12}>
                                Chuyển từ
                                <TextArea defaultValue={toMove} rows={4} style={{width: 250}}/>
                            </Col>
                            <Col className="col-span-12" span={12}>
                                Chuyển đến
                                <TextArea defaultValue={fromMove} rows={4} style={{width: 250}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-span-12" span={12}>
                                <Input addonBefore={heardCost} defaultValue={cost}/>
                            </Col>
                            <Col className="col-span-12" span={12}>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-span-12" span={12}>
                                Ghi Chú :
                                <TextArea rows={4} defaultValue={note}/>
                            </Col>
                            <Col className="col-span-12" span={12}>
                                <Row>
                                    <div>
                                        <br/>Time : &nbsp; &nbsp;
                                        <DatePicker onChange={this.onChangeDateMove}/>
                                    </div>
                                    <br/>
                                    <div>
                                        Trạng thái : &nbsp; &nbsp;
                                        <Switch defaultChecked={tick} checkedChildren={<Icon type="check"/>}
                                                unCheckedChildren={<Icon type="cross"/>}/>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Modal>
            </div>
        );
    }
}

EditOrderDetail.propTypes = {
    item: PropTypes.object,
    visible: PropTypes.bool,
    handleOnChangeShow: PropTypes.func
};

export default EditOrderDetail;
