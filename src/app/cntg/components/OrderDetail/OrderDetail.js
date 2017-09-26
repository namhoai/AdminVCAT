import React from 'react';
import PropTypes from 'prop-types';
import {Card, Row, Col, Avatar, TimePicker, Button, Popover, Modal, Switch, Input, Icon, Select, DatePicker} from 'antd';
import moment from 'moment';
import './styles/orderDetail.less';

const Option = Select.Option;
const {TextArea} = Input;
const { MonthPicker, RangePicker } = DatePicker;

const heardFullName = (<div style={{ width: 80 }}>Họ Và Tên</div>);
const heardPhone = (<div style={{ width: 80 }}>Số điện thoại</div>);
const heardGmail = (<div style={{ width: 80 }}>Gmail</div>);
const heardCost = (<div style={{ width: 80 }}>Giá</div>);

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = { visible: false }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleChangeMember = (value) => {
        console.log(`selected ${value}`);
    };
    onChangeDateMove = (date, dateString) => {
        console.log(date, dateString);
    };
    render() {
        const { item } = this.props;
        const fullName = item.getIn(['user', 'name']);
        const phone = item.getIn(['user', 'phone']);
        const cost = item.getIn(['order', 'cost']);
        const note = item.getIn(['order', 'note']);
        const toMove = item.getIn(['order', 'toMove']);
        const fromMove= item.getIn(['order', 'fromMove']);
        const gmail = item.getIn(['user', 'gmail']);
        const tick = (item.get('tick') === 1);
        debugger;
        const noteContainer = (<div className="note-order">{note}</div>);
        return (
            <div className="orderDetail" >
                <div className="title-order">Chi tiết đơn hàng</div>
                <Card style={{ height: 455 }} className="orderItem">
                    <Button shape="circle" icon="edit" onClick={this.showModal}/>
                    <Popover content={noteContainer} trigger="click" placement="leftTop">
                        <Button style={{ float: 'right' }} shape="circle" type="danger" ghost icon="exclamation" />
                    </Popover>
                    <Row className="fullName-order" >{fullName}</Row>
                    <Row className="cost-order" ><Button type="danger" size="large" ghost>{cost} đ </Button></Row>
                    <Row>
                        <Col className="listUser-order" span={18}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Col>
                        <Col className="time-order" span={6}>
                            <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} disabled />
                        </Col>
                    </Row>
                    <Row className="info-address">
                        <Col span={12}>
                            <div className="title-order border-bottom" >Chuyển từ</div>
                            { fromMove }
                        </Col>
                        <Col span={12}>
                            <div className="title-order border-bottom" >Chuyển đến</div>
                            { toMove }
                        </Col>
                    </Row>
                    <Row className="phone-order">
                        <Button size="large" type="danger" ghost>{phone}</Button>
                    </Row>

                </Card>
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
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore={heardFullName} defaultValue={fullName} />
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore={heardPhone} defaultValue={phone} />
                                </div>
                                <div>
                                    <Input addonBefore={heardGmail} defaultValue={gmail} />
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            Thông tin nguời vận chuyển
                            <Card className="info-user edit-member" style={{ height: 166 }}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
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
                                <TextArea defaultValue={toMove} rows={4} style={{ width: 250 }} />
                            </Col>
                            <Col className="col-span-12" span={12}>
                                Chuyển đến
                                <TextArea defaultValue={fromMove} rows={4} style={{ width: 250 }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-span-12" span={12}>
                                <Input addonBefore={heardCost} defaultValue={cost} />
                            </Col>
                            <Col className="col-span-12" span={12}>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-span-12" span={12}>
                                Ghi Chú :
                                <TextArea rows={4} />
                            </Col>
                            <Col className="col-span-12" span={12}>
                                <Row>
                                    <div>
                                         <br/>Time : &nbsp; &nbsp;
                                        <DatePicker onChange={this.onChangeDateMove} />
                                    </div>
                                    <br/>
                                    <div>
                                        Trạng thái : &nbsp; &nbsp;
                                        <Switch defaultChecked={tick} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
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

OrderDetail.propTypes = {
    item: PropTypes.object,
};

export default OrderDetail;
