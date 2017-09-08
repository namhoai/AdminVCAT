import React from 'react';
import { Row, Col } from 'antd';
import ListOrder from './ListOrder/ListOrderContainer';
import OrderDetail from './OrderDetail/OrderDetailContainer';

class CNTG extends React.Component {
    constructor() {
        super();
        this.state = {
            orderId: ''
        };
        this.callBack = this.callBack.bind(this);
    }

    callBack(newOrderId) {
        debugger;
        this.setState({
            orderId: newOrderId
        });
    }

    render() {
        return (
            <Row>
                <Col span={12}>
                    <ListOrder  callBack={this.callBack} />
                </Col>
                <Col span={12}>
                    {
                        (this.state.orderId !== '') &&
                        <OrderDetail orderId={this.state.orderId}/>
                    }
                </Col>
            </Row>
        );
    }
}

// function mapStateToProp(state) {
//     return {
//         authenticated: state.userReducer.authenticated,
//         isAuthenticating: state.userReducer.isAuthenticating,
//         isAdmin: state.userReducer.isAdmin
//     };
// }
//
// function mapDispatchToProp(dispatch) {
//     return {
//         login: (data) => {
//             dispatch(loginRequest(data));
//         }
//     };
// }

// const WrappedLogin = Form.create()(Login);
// export default connect(mapStateToProp, mapDispatchToProp)(withRouter(WrappedLogin));

export default CNTG;
