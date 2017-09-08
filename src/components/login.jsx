import React from 'react';
import {Form, Button, Input, Icon} from 'antd';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginRequest} from '../redux/actions/user';
import Logo from '../assets/imgs/logo.svg';
import store from '../redux/store/';
import {setOpenKeys} from '../redux/actions/menu';
import {cryptPwd} from '../utils/index';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                debugger;
                this.props.login({
                    username: this.state.username,
                    // password: cryptPwd(this.state.password)
                    password: this.state.password
                });
            }
        });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: this.props.isAdmin ? '/orders/orderUnassign' : '/express/orderListNew/noMsgOrderList'}};
        if (this.props.authenticated) {
            const arr = from.pathname.split('/');
            if (arr[1] && arr[2] && arr[3]) {
                store.dispatch(setOpenKeys(['express', 'msgOrder']));
            } else if (arr[1] && arr[2]) {
                store.dispatch(setOpenKeys([arr[1]]));
            }
            return (<Redirect to={from.pathname}/>);
        }
        debugger;
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{height: '100vh', background: 'rgba(0, 0, 0, .5)'}}>
                <div style={{
                    width: 300,
                    height: 280,
                    background: 'white',
                    boxShadow: '0 0 100px rgba(0,0,0,.6)',
                    borderRadius: 5,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <div style={{height: '100%', padding: '0 20px'}}>
                        <div style={{textAlign: "center", margin: 15}}>
                            <img alt="logo" src={Logo} style={{width: 80, verticalAlign: 'middle'}}/>
                        </div>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem>
                                {
                                    getFieldDecorator('userName', {
                                        rules: [{required: true, message: 'Not empty !'}]
                                    })(
                                        <div style={{marginTop: 10}}>
                                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} size="large"
                                                   name="username" placeholder="User Name or Email"
                                                   onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Not empty！'}]
                                    })(
                                        <div style={{marginTop: 10}}>
                                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} size="large"
                                                   type="password" name="password" placeholder="Password"
                                                   onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    )
                                }
                            </FormItem>
                            <div style={{position: 'absolute', bottom: 10, left: 0, width: '100%', padding: '0 20px'}}>
                                <Button type="primary" htmlType="submit" loading={this.props.isAuthenticating}
                                        style={{width: '100%'}}>Login</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProp(state) {
    return {
        authenticated: state.userReducer.authenticated,
        isAuthenticating: state.userReducer.isAuthenticating,
        isAdmin: state.userReducer.isAdmin
    };
}

function mapDispatchToProp(dispatch) {
    return {
        login: (data) => {
            dispatch(loginRequest(data));
        }
    };
}

const WrappedLogin = Form.create()(Login);
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(WrappedLogin));
