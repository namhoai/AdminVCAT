import React from 'react';
import PropTypes from 'prop-types';
import OrderItemContainer from './OrderItemContainer';
import { Button, Icon, Progress } from 'antd';

class ListOrder extends React.Component {

    constructor(props) {
        debugger;
        super(props);
    }

    render() {
        debugger;
        const { listItems, callBack } = this.props;
        return (
            <div>
                <div className="title-order">Danh sách đơn hàng</div>

                {
                    (listItems !== undefined) &&
                    listItems.map((orderId) => {
                        return (
                            <OrderItemContainer orderId={orderId} callBack={callBack} />
                        )
                    })
                }
                <Button className="margin-top" type="danger" ghost shape="circle" icon="plus" size='large' />
                <div className="control-order margin-top">
                    <Button.Group size='default'>
                        <Button type="primary">
                            <Icon type="left" />Back
                        </Button>
                        <Button type="primary">
                            Next<Icon type="right" />
                        </Button>
                    </Button.Group>
                </div>
                <div className="info-overview">
                    <Progress type="circle" percent={30} width={30} />
                    <span>Doanh thu thang 8 </span>
                    <Progress type="circle" percent={70} width={30} status="exception" />
                    <span>Ty le huy don hang</span>
                    <Progress type="circle" percent={100} width={30} />
                    <span>hoan thanh cong viec</span>
                </div>
            </div>
        );
    }
}

ListOrder.propTypes = {
    listItems: PropTypes.object,
};

export default ListOrder;
