import React from 'react';
import PropTypes from 'prop-types';
import {Card, Row, Col, Avatar, TimePicker, Button, Popover, Modal, Switch, Input, Icon, Select, DatePicker} from 'antd';
import EditOrderDetailContainer from '../EditOrderDetail/EditOrderDetailContainer'
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

    handleOnChangeShow = (check) => {
        this.setState({
           visible: !check,
        })
    };

    render() {
        const {item, orderId} = this.props;
        const fullName = item.getIn(['user', 'name']);
        const phone = item.getIn(['user', 'phone']);
        const cost = item.getIn(['order', 'cost']);
        const note = item.getIn(['order', 'note']);
        const toMove = item.getIn(['order', 'toMove']);
        const fromMove= item.getIn(['order', 'fromMove']);
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
                        {phone}
                    </Row>

                </Card>
                {
                    this.state.visible &&
                    <EditOrderDetailContainer
                        handleOnChangeShow={this.handleOnChangeShow}
                        visible={this.state.visible}
                        orderId={orderId}
                    />
                }
            </div>
        );
    }
}

OrderDetail.propTypes = {
    item: PropTypes.object,
    orderId: PropTypes.string,
};

export default OrderDetail;
