import React from 'react';
import API from '../api/index';
import { message, Modal } from 'antd';
import SenderItem from './sender-item';
import SenderNew from './sender-new';
import SenderEdit from './sender-edit';

const confirm = Modal.confirm;
class SenderSetting extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isNewDlg: false,
      datas: [],
      modalData: {
        title: 'Add a contact',
        sendName: '',
        sendaddr: '',
        sendcity: [],
        sendcompany: '',
        sendzipcode: '',
        sendmobile: '',
        sendtel: '',
        id: null,
        default: false,
        confirmLoading: false,
        handleOk: (payload) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              confirmLoading: true
            }
          });
          if (payload.id) {
            API.updateSenderResource(payload).then((res) => {
              if (res.data.code === 200) {
                message.success('Modify contact success ！');
                this.setState({
                  ...this.state,
                  modalData: {
                    ...this.state.modalData,
                    confirmLoading: false
                  }
                });
                this.hideDialog();
                this.getData();
              } else {
                this.setState({
                  ...this.state,
                  modalData: {
                    ...this.state.modalData,
                    confirmLoading: false
                  }
                });
                message.error('Modify contact operation failed ！');
              }
            });
          } else {
            API.addSenderResource(payload).then((res) => {
              if (res.data.code === 200) {
                message.success('Added contact success ！');
                this.setState({
                  ...this.state,
                  modalData: {
                    ...this.state.modalData,
                    confirmLoading: false
                  }
                });
                this.hideDialog();
                this.getData();
              } else {
                this.setState({
                  ...this.state,
                  modalData: {
                    ...this.state.modalData,
                    confirmLoading: false
                  }
                });
                message.error('New contact failed ！');
              }
            });
          }
        },
        handleCancel: () => {
          this.hideDialog();
        },
        onChange: (e) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              default: e.target.checked
            }
          });
        }
      }
    };
  }
  componentDidMount() {
    document.title = 'Sender Management';
    this.getData();
  }
  getData() {
    API.getSendersResource().then((res) => {
      if (res.data.code === 200) {
        this.setState({
          datas: res.data.data.list
        });
      } else {
        this.setState({
          datas: []
        });
        message.error('Failed to get sender information ！');
      }
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
    });
  }
  newSenderDlg() {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        title: 'Add a contact',
        sendName: '',
        sendaddr: '',
        sendcity: [],
        sendcompany: '',
        sendzipcode: '',
        sendmobile: '',
        sendtel: '',
        default: false,
        id: null
      },
      showModal: true,
      isNewDlg: true
    });
  }
  editSenderDlg(item) {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        visible: true,
        title: 'Edit the contact',
        sendName: item.sendName,
        sendaddr: item.sendaddr,
        sendcity: item.sendcity,
        sendcompany: item.sendcompany,
        sendzipcode: item.sendzipcode,
        sendmobile: item.sendmobile,
        sendtel: item.sendtel,
        default: item.default,
        id: item.id
      },
      showModal: true,
      isNewDlg: false
    });
  }
  delDlg(item) {
    confirm({
      title: 'You are sure to delete the sender information ?',
      onOk: () => {
        API.delSenderResource({ id: item.id }).then((res) => {
          if (res.data.code === 200) {
            message.success('Deleting Sender Information Successfully ！');
            this.getData();
          } else {
            message.error('Deleting Sender Information Operation failed ！');
          }
        });
      }
    });
  }
  render() {
    const listItems = this.state.datas.map((item, index) =>
      (<li style={{ float: 'left', margin: '10px' }} key={index}>
        <SenderItem props={item} editSenderDlg={this.editSenderDlg.bind(this, item)} delDlg={this.delDlg.bind(this, item)} />
      </li>)
    );

    return (<div>
      <ul className="clearfix">
        {listItems}
        <li style={{ float: 'left', margin: '10px' }} key="senderNew">
          <SenderNew newSenderDlg={this.newSenderDlg.bind(this)} />
        </li>
      </ul>
      { this.state.showModal ? <SenderEdit data={this.state.modalData} /> : '' }
    </div>);
  }
}

export default SenderSetting;
