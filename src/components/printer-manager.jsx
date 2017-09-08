import React from 'react';
import { message, notification, Card } from 'antd';
import API from '../api/index';
import mLODOP from '../utils/print.js';

class PrinterManager extends React.Component {
  constructor() {
    super();
    this.checkIsInstall = this.checkIsInstall.bind(this);
    this.changeDefaultPrinter = this.changeDefaultPrinter.bind(this);
    this.state = {
      printer: '',
      checkMsg: '',
      checkCMsg: ''
    };
  }
  componentDidMount() {
    document.title = 'Printer management';
    API.getDefaultPrinter().then((res) => {
      this.setState({
        printer: res.data.data.printer
      });
    });
    // if (mLODOP.getMLodop()) {
    //   window.LODOP.Create_Printer_List(document.getElementById('printerChoose'));
    // }
  }
  changeDefaultPrinter() {
    API.changeDefaultPrinter().then((res) => {
      if (res.data.code === 200) {
        message.success('success ！');
      } else {
        message.error('error ！');
      }
    });
  }
  checkIsInstall() {
    let msg = 'f the print plug is not detected, make sure the print program is installed, or the print program is already running! For help, please contact 029-90879090';
    let cmsg = msg;
    if (mLODOP.getMLodop()) {
      if (window.LODOP.VERSION < '6.2.1.7') {
        msg = 'The current Lodop control version number ：' + window.LODOP.VERSION + 'Need to upgrade to the latest version ！';
      } else {
        msg = 'The current Lodop control is available! Lodop version number：' + window.LODOP.VERSION;
      }
      if (window.CLODOP.CVERSION < '2.1.0.2') {
        cmsg = 'The current C-Lodop control version number：' + window.CLODOP.CVERSION + 'Need to upgrade to the latest version！';
      } else {
        cmsg = 'Current C-Lodop Cloud Print Available! C-Lodop Version Number: ' + window.CLODOP.CVERSION;
      }
    } else {
      cmsg = '';
      notification.error({
        message: 'Error message',
        description: 'If the print plug is not detected, make sure that the print program is installed, or that the print program is already running ！'
      });
    }

    this.setState({
      checkMsg: msg,
      checkCMsg: cmsg
    });
  }

  render() {
    return (<div>
      <div style={{ fontSize: 20, margin: '20px 0', color: '#000' }}>
        <h3>Printer detection</h3>
        <ul className="clearfix">
          {/*<li style={{ float: 'left', margin: '10px' }} key="default">
            <Card className="senderItem" title="修改默认打印机" extra={<a href="javascript:;" onClick={this.changeDefaultPrinter}>修改</a>} style={{ width: 300, height: 210 }}>
              <p>当前设置的默认打印机是:</p>
              <p style={{ margin: '8px 20px' }}>{this.state.printer}</p>
              <select id="printerChoose" className="ant-select ant-select-selection ant-select-selection--single" defaultValue="请选择打印机" style={{ display: 'inline-block', width: 220, marginTop: 8 }}>
              </select>
            </Card>
          </li>*/}
          <li style={{ float: 'left', margin: '10px' }} key="check">
            <Card className="senderItem" title="Check whether the print plug is installed" extra={<a href="javascript:;" onClick={this.checkIsInstall}>Detection</a>} style={{ width: 300, height: 210 }}>
              <p style={{ fontSize: 14 }}>{this.state.checkMsg}</p>
              <p style={{ fontSize: 14, marginTop: 14 }}>{this.state.checkCMsg}</p>
            </Card>
          </li>
        </ul>
      </div>
      <div style={{ fontSize: 20, margin: '20px 0', color: '#000' }}>
        <h3>Printer installer</h3>
        <div style={{ fontSize: 14, margin: '12px' }}>
          <p>download link：<a className="ant-btn ant-btn-primary" style={{ marginLeft: 5, lineHeight: '26px' }} target="_blank" href="//cdn.kuaidi100.com/download/lodop/CLodopPrint_Setup_for_Win32NT.exe">I installed it</a>，After the installation is successful, please !<a className="ant-btn ant-btn-primary" style={{ marginLeft: 8, lineHeight: '26px' }} href="javascript:;" onClick={() => { window.location.reload(); }}>Refresh page</a></p>
        </div>
      </div>
    </div>);
  }
}

export default PrinterManager;
