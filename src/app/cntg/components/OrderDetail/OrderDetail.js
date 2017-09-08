import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Avatar, TimePicker, Button, Popover, Icon } from 'antd';
import moment from 'moment';
import './styles/orderDetail.less';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        debugger;
    }

    render() {
        const { item } = this.props;
        const fullName = item.getIn(['user', 'name']);
        const cost = item.getIn(['order', 'cost']);
        const note = item.getIn(['order', 'note']);
        const toMove = item.getIn(['order', 'toMove']);
        const fromMove= item.getIn(['order', 'fromMove']);
        debugger;
        return (
            <div>
                <div className="title-order">Chi tiết đơn hàng</div>
                <Card style={{ height: 455 }} className="orderItem">
                    <Button shape="circle" icon="edit" />
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
                            <div className="title-order" >Chuyển từ</div>
                            { fromMove }
                        </Col>
                        <Col span={12}>
                            <div className="title-order" >Chuyển đến</div>
                            { toMove }
                        </Col>
                    </Row>
                    <Row className="note-order">
                        <Popover content={note} visible placement="bottom">
                            <Button type="danger" ghost>Note</Button>
                        </Popover>
                    </Row>
                </Card>
            </div>
        );
    }
}

OrderDetail.propTypes = {
    item: PropTypes.object,
};

export default OrderDetail;
