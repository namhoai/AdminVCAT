import React from 'react';
import { Layout, Menu, Icon, Modal, Button, Input } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestData, logoutRequest } from '../redux/actions/user';
import { setCurrentItem, setOpenKeys, setMenuFold } from '../redux/actions/menu';
import RecursiveMenus from '../utils/menu';
import '../assets/less/app.less';
import Logo from '../assets/imgs/logo.svg';

const { Header, Sider, Footer, Content } = Layout;
const SubMenu = Menu.SubMenu;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pagination: { total: 20 },
      data: [],
      loading: false,
      passwdDlg: false
    };
  }
  componentDidMount() {
    const location = this.props.location.pathname;
    const arr = location.split('/');
    if (arr[1] && arr[2] && arr[3]) {
      this.props.setOpenKeys([arr[1], arr[2]]);
    } else if (arr[1] && arr[2]) {
      this.props.setOpenKeys([arr[1]]);
    }
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.props.openKeys.indexOf(key) > -1));
    const latestCloseKey = this.props.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }

    this.props.setOpenKeys(nextOpenKeys);
  }
  onCollapse(collapsed) {
    this.props.setMenuFold(collapsed);
  }
  getAncestorKeys(key) {
    const map = {
      msgOrder: ['express']
    };
    return map[key] || [];
  }
  menuClick(e) {
    console.log(e.key);
    this.props.setCurrentItem(e.key);
  }
  toggle() {
    this.props.setMenuFold(!this.props.menuFold);
  }
  logout() {
    this.props.logout();
  }
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, passwdDlg: false });
    }, 3000);
  }
  handleCancel() {
    this.setState({ passwdDlg: false });
  }
  modifyPasswd() {
    this.setState({
      passwdDlg: true
    });
  }
  request(pageNumber) {
    
  }
  send() {
    this.props.sendData();
  }
  render() {
    if (!this.props.authenticated) {
      return (<Redirect to={{
        pathname: '/login',
        state: {
          from: {
            pathname: this.props.location.pathname
          }
        }
      }}
      />);
    }
    const menuProps = !this.props.menuFold ? {
      onOpenChange: this.onOpenChange.bind(this),
      openKeys: this.props.openKeys
    } : {};
    const location = this.props.location.pathname;
    const arr = location.split('/');
    const defaultSelectedKeys = arr[1] && arr[2] && arr[3] ? [arr[3]] : arr[1] && arr[2] ? [arr[2]] : arr[1] ? [arr[1]] : [''];
    const notAdminMenu=[{
      key: 'orderListNew',
      path: '/express/orderListNew',
      name: 'order ListNew',
      icon: 'meh-o',
      children: [{
        key: 'noMsgOrderList',
        path: '/express/orderListNew/noMsgOrderList',
        name: 'no MsgOrder List'
      }, {
        key: 'msgOrderList',
        path: '/express/orderListNew/msgOrderList',
        name: 'msg Order List'
      }]
    }, {
      key: 'orderListFinish',
      path: '/express/orderListFinish',
      name: 'order List Finish',
      icon: 'smile-o'
    }, {
      key: 'orderListBack',
      path: '/express/orderListBack',
      name: 'order List Back',
      icon: 'rollback'
    }, {
      key: 'orderList',
      path: '/express/orderList',
      name: 'order List',
      icon: 'solution'
    }, {
      key: 'senderSetting',
      path: '/print/senderSetting',
      name: 'sender Setting',
      icon: 'user'
    }, {
      key: 'printerManager',
      path: '/print/printerManager',
      name: 'printer Manager',
      icon: 'printer'
    }];
    const adminMenu=[{
      key: 'orders',
      path: '/orders/list',
      name: 'orders',
      icon: 'printer',
      children: [{
        key: 'orderUnassign',
        path: '/orders/orderUnassign',
        name: 'order Unassign'
      }, {
        key: 'orderAssigned',
        path: '/orders/orderAssigned',
        name: 'order Assigned'
      },{
        key: 'UnreturnVisitOrders',
        path: '/orders/UnreturnVisitOrders',
        name: 'Unreturn VisitOrders'
      }, {
        key: 'ReturnVisitOrders',
        path: '/orders/ReturnVisitOrders',
        name: 'Return Visit Orders'
      }, {
        key: 'OrdersBack',
        path: '/orders/OrdersBack',
        name: 'Orders Back'
      }]
    }, {
      key: 'userList',
      path: '/user/userList',
      name: 'User List',
      level: 0,
      icon: 'user'
    }, {
      key: 'orderListBack',
      path: '/express/orderListBack',
      name: 'Order ListBack',
      icon: 'phone'
    }];
    return (<div style={{ height: '100vh' }}>
      <Layout>
        <Sider className="sider" style={{ backgroundColor: 'white', height: '100vh' }} collapsed={this.props.menuFold} onCollapse={this.onCollapse.bind(this)}>
          <div style={{ height: 64, textAlign: 'center', lineHeight: '64px', borderRight: '1px solid #e9e9e9' }}>
            <img alt="logo" src={Logo} className="logo" />
          </div>
          <Menu {...menuProps} mode={this.props.menuFold ? 'vertical' : 'inline'} defaultSelectedKeys={defaultSelectedKeys} onClick={this.menuClick.bind(this)}>
            { this.props.isAdmin ? RecursiveMenus(adminMenu,false) : RecursiveMenus(notAdminMenu,false)}
          </Menu>
        </Sider>
        <Layout style={{ overflow: 'auto', height: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="menuFold">
              <Icon
                className="trigger"
                type={this.props.menuFold ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle.bind(this)}
              />
            </div>
            <div className="user">
              <Menu mode="horizontal" className="menu">
                <SubMenu className="item" key="" title={<span><Icon type="user" />{this.props.userName}</span>}>
                  <Menu.Item key="passwd">
                    <div onClick={this.modifyPasswd.bind(this)}>Modify Password</div>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <div onClick={this.logout.bind(this)}>Logout</div>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Header>
          <Content style={{ padding: '24px', overflow: 'initial' }}>
            <div style={{ background: '#fff', minHeight: 'calc(100vh - 190px)', color: 'green', padding: '24px' }}>
              {this.props.children}
              {/*<div style={{ fontSize: 30, padding: '100 0', textAlign: 'center' }}>
                <h3>数据：{this.props.customData ? this.props.customData.data.payload.orderstate : '无数据' }</h3>
                <Button onClick={this.send.bind(this)}>saga异步获取数据</Button>
              </div>*/}
            </div>
            <div style={{ padding: '0 20' }}>
              <Modal
                visible={this.state.passwdDlg}
                title="Change Password"
                style={{ top: '50%', marginTop: '-139px' }}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                  <Button
                    key="back" size="large" onClick={this.handleCancel.bind(this)}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="submit" type="primary" size="large" disabled={this.props.isAuthenticating}
                    loading={this.state.loading} onClick={this.handleOk.bind(this)}
                  >
                    Change
                  </Button>
                ]}
              >
                <Input placeholder="Password old" style={{ marginTop: 20 }} />
                <Input placeholder="New password" style={{ marginTop: 20 }} />
                <Input placeholder="Enter the new password" style={{ marginTop: 20 }} />
              </Modal>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', fontSize: 20, background: '#fff' }}>
            designer by NamVH © 2017
          </Footer>
        </Layout>
      </Layout>
    </div>);
  }
}

function mapStateToProp(state) {
  return {
    authenticated: state.userReducer.authenticated,
    isAuthenticating: state.userReducer.isAuthenticating,
    customData: state.userReducer.customData,
    current: state.menuReducer.currentItem,
    openKeys: state.menuReducer.openKeys,
    menuFold: state.menuReducer.menuFold,
    isAdmin: state.userReducer.isAdmin,
    userName: state.userReducer.userName
  };
}

function mapDispatchToProp(dispatch) {
  return {
    logout: () => {
      dispatch(logoutRequest());
    },
    sendData: (data) => {
      dispatch(requestData(data));
    },
    setOpenKeys: (data) => {
      dispatch(setOpenKeys(data));
    },
    setMenuFold: (data) => {
      dispatch(setMenuFold(data));
    },
    setCurrentItem: (data) => {
      dispatch(setCurrentItem(data));
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(App));
