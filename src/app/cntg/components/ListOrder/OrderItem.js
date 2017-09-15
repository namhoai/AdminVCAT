import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Button, Popconfirm, message, TimePicker, Tooltip } from 'antd';
import moment from 'moment';
import './styles/orderItem.less';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#45B39D', '#5B2C6F', '#AF7AC5', '#82E0AA', '#2E86C1', '#D35400'];
const text = 'Bạn có muốn xóa đơn hàng ?';

function confirm() {
    message.info('Xóa thành công !');
}

class OrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.callBack(this.props.item.getIn(['id']));
    }

    render() {
        const { item } = this.props;
        debugger;
        const lastName = item.getIn(['user', 'name']).split(' ').slice(-1).join(' ');
        const fullName = item.getIn(['user', 'name']);
        const check = item.getIn(['tick']);
        const gmail = item.getIn(['user', 'gmail']);
        const numberRandom = Math.floor(Math.random() * 9);
        const statusOrder = (check === 1) ?
            <span>
                <Button
                    className="button-check-orderItem"
                    type="primary"
                    shape="circle"
                    icon="check"
                    size='small'
                />
                <span>
                    20/10/2017
                </span>
            </span>
            :
            (
                <span>
                    <Button
                        className="button-new-orderItem"
                        disabled
                        type="primary"
                        icon="key"
                    >
                        NEW
                    </Button>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} disabled />
                </span>
            );
        return (
            <div className="orderItem" >
                <div onClick={this.onClick}>
                    <Tooltip placement="right" title={gmail}>
                        <Card>
                            <div className="avatar-orderItem">
                                <Avatar size="large"
                                        style={{ backgroundColor: colorList[numberRandom] }}>
                                    {lastName[0]}
                                </Avatar>
                            </div>
                            <span>{fullName}</span>
                            {statusOrder}
                        </Card>
                    </Tooltip>
                </div>
                <Popconfirm
                    placement="top"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        className="button-delete-orderItem"
                        type="danger"
                        shape="circle"
                        icon="close"
                        size='small'
                    />
                </Popconfirm>
            </div>
        );
    }
}

OrderItem.propTypes = {
    item: PropTypes.object,
};

export default OrderItem;
