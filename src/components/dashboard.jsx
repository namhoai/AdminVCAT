import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/less/dashboard.less';
import avar from '../assets/imgs/avar.gif';
import store from '../redux/store/';
import { setOpenKeys } from '../redux/actions/menu';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // chek người dùng để hiển thị đúng các quyền cho menu các mục.
    if (this.props.isAdmin) {
      store.dispatch(setOpenKeys(['orders']));
    } else {
      store.dispatch(setOpenKeys(['express', 'msgOrder']));
    }
    // return this.props.isAdmin ? <Redirect to="/orders/orderUnassign" /> : <Redirect to="/express/orderListNew/noMsgOrderList" />;
    return (
      <div className="dashboard">
        <div className="clearfix">
          <div className="avar">
             <img src={avar} />
          </div>
          <div className="info">
            <p className="name">
              Dear user : <span style={{ color: 'green', margin: '0 5px' }}>{this.props.userName}</span>, Welcome！
            </p>
            <p className="other">
              <span className="tip">Do your best, the good things will come to you !</span>
            </p>
          </div>
        </div>
        <div className="shortcut">
          <Link to="/orders/orderUnassign" className="btn pink-btn">Order Unassign</Link>
          <Link to="/express/orderListNew" className="btn light-blue-btn">Order ListNew</Link>
          <Link to="/print/printerManager" className="btn green-btn">Printer Manager</Link>
          <a
              href="https://www.facebook.com/chuyennhaantam24h/"
              target="_blank"
              className="btn yellow-btn"
          >View Page</a>
        </div>
      </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    userName: state.userReducer.userName,
    isAdmin: state.userReducer.isAdmin
  };
}

export default connect(mapStateToProp)(Dashboard);
