import React from 'react';
import API from '../api/index';
import { Table, message, Button, Input, notification } from 'antd';
import mLODOP from '../utils/print.js';
import OrderDetail from './order-detail';
import OrderPrintPreview from './order-print-preview';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  key: 'id',
  dataIndex: 'id',
  width: 50
}, {
  title: 'Goods name',
  key: 'goodsName',
  dataIndex: 'goodsName',
  width: 200
}, {
  title: 'Order ID',
  key: 'orderID',
  dataIndex: 'orderID',
  width: 80
}, {
  title: 'Nick name',
  key: 'nickname',
  dataIndex: 'nickname',
  width: 80
}, {
  title: 'Time',
  key: 'time',
  dataIndex: 'time',
  width: 80
}, {
  title: 'Address',
  key: 'address',
  dataIndex: 'address',
  width: 150
}, {
  title: 'Express',
  key: 'express',
  dataIndex: 'express',
  width: 80
}, {
  title: 'Printed',
  key: 'printed',
  dataIndex: 'printed',
  width: 80
}];

class OrderListNew extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      orderDetailData: null,
      orderID: null,
      collapsed: false,
      pageTotal: 0,
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [],
      loading: false,
      showModal: false,
      modalData: {
        confirmLoading: false,
        orderSelectList: '',
        handleOk: (payload) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              confirmLoading: true
            }
          });

          API.saveUnassignOrderResource({ orderID: this.state.orderID, vendorID: payload[0] }).then((res) => {
            if (res.data.code === 200) {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.success('success');
            } else {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.error('error！');
            }
          });
        },
        handleCancel: () => {
          this.hideDialog();
        },
        handlePreview: () => {
          this.startPrint();
        }
      }
    };
  }
  componentDidMount() {
    document.title = 'No shipping order';
    this.request({
      page: 1,
      pageSize: 10
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
    });
  }
  printOrder() {
    console.log(this.state.selectedRowKeys.length);
    if (this.state.selectedRowKeys.length > 1) {
      message.error('This feature does not support batch operation ！');
      return;
    }
    if (this.state.selectedRowKeys.length === 0) {
      message.error('Please select the printed courier order first ！');
      return;
    }
    this.setState({
      ...this.state,
      orderID: this.state.selectedRowKeys,
      orderSelectList: this.state.selectedRowKeys.join(),
      showModal: true
    });
  }
  startPrint() {
    if (!mLODOP.getMLodop()) {
      notification.error({
        message: 'Error message',
        description: 'You have not installed the print plugin, or have not run the print program. Go to the printer management page to download, install, test !',
        duration: 5
      });
    } else {
      const tempLodop = mLODOP.getMLodop();
      Promise.all([API.getDefaultPrinter(), API.getOrderPrintDataResource(), API.getDefaultSenderResource(), API.getExpressTemplateResource()]).then((values) => {
        const defaultPrinter = values[0].data.data.printer;
        const receiverData = values[1].data.data;
        const senderData = values[2].data.data;
        const tempdata = values[3].data.data;
        let reSendCity = '';
        if (senderData && senderData.sendcity) {
          reSendCity = '' + senderData.sendcity[0] + senderData.sendcity[1] + senderData.sendcity[2];
        }
        const printData = { ...receiverData, ...senderData, sendcity: reSendCity };
        mLODOP.printPurge(defaultPrinter);
        mLODOP.printResume(defaultPrinter);
        const rTemplate = window.kdPrintBase.printContentReplace(tempdata.note, printData, tempdata);
        eval(rTemplate);
        if (!mLODOP.checkPrinter(defaultPrinter)) {
          notification.error({
            message: 'Error message',
            description: 'You have not installed the print plugin, or have not run the print program. Go to the printer management page to download, install, test ！'
          });
        } else {
          tempLodop.SET_PRINT_PAGESIZE(1, parseFloat(tempdata.width) * 10, parseFloat(tempdata.height) * 10, '');
          tempLodop.SET_SHOW_MODE('HIDE_PAPER_BOARD', true);
          tempLodop.SET_PREVIEW_WINDOW(2, 1, 1, 700, 440, 'Express single print');
          tempLodop.SET_SHOW_MODE('PREVIEW_IN_BROWSE', true);
          tempLodop.SET_PRINTER_INDEX(defaultPrinter);
          tempLodop.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW', 1);
          mLODOP.preview();
          this.hideDialog();
        }
      }).catch((reason) => {
        notification.error({
          message: 'Error message',
          description: reason
        });
        console.log(reason);
      });
    }
  }
  onBackOrderItem() {
    API.updateOrderVendorResource({ id: this.state.selectedRowKeys.join() }).then((res) => {
      if (res.data.code === 200) {
        message.success('success ！');
      } else {
        message.error('error ！');
      }
    });
  }
  updateOrdersExpressStatus() {
    API.updateOrdersExpressStatusResource({ orderID: this.state.selectedRowKeys.join() }).then((res) => {
      if (res.data.code === 200) {
        message.success('success ！');
      } else {
        message.error('error ！');
      }
    });
  }
  request(payload) {
    this.setState({
      loading: true
    });

    API.getOrderListNewResource(payload).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          data: res.data.data,
          loading: false,
          pageTotal: res.data.total,
          selectedRowKeys: []
        });
      } else {
        message.error('Failed to get unposted order information ！');
        this.setState({
          data: [],
          loading: false
        });
      }
    });
  }
  handleTableChange(pagination) {
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize,
      orderID: this.state.queryKey
    });
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      ...this.state,
      selectedRowKeys
    });
  }
  onRowClick(record, index) {
    API.getOrderDetailResource({ orderID: record.id }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          orderDetailData: res.data.data
        });
      } else {
        message.error('Order allocation operation failed ！');
      }
    });
  }
  onShowSizeChange(current, size) {
    this.setState({
      ...this.state,
      pagination: {
        current,
        pageSize: size
      }
    });
  }
  onPaginationChange(page, pageSize) {
    this.setState({
      ...this.state,
      pagination: {
        current: page,
        pageSize
      }
    });
  }
  onSearch(value) {
    this.setState({
      ...this.state,
      queryKey: value,
      pagination: {
        ...this.state.pagination,
        current: 1
      }
    });
    this.request({
      orderID: value,
      page: 1,
      pageSize: this.state.pagination.pageSize
    });
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    const pagination = {
      total: this.state.pageTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      onChange: this.onPaginationChange.bind(this),
      onShowSizeChange: this.onShowSizeChange.bind(this)
    };
    return <div className="orderListnew">
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="Please enter the express number" onSearch={this.onSearch.bind(this)} />
        </div>
        <div style={{ float: 'left', display: 'flex' }}>
          <Button type="primary" icon="printer" style={{ margin: '0 5px' }} onClick={this.printOrder.bind(this)}>Print express delivery</Button>
          <Button type="primary" icon="rollback" style={{ margin: '0 5px' }} onClick={this.onBackOrderItem.bind(this)}>Return order</Button>
          <Button type="primary" icon="to-top" style={{ margin: '0 5px' }} onClick={this.updateOrdersExpressStatus.bind(this)}>Batch delivery</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        rowSelection={rowSelection}
        onRowClick={this.onRowClick.bind(this)}
        scroll={{ x: 1500 }}
      />
      <OrderDetail {...this.state.orderDetailData} />
      { this.state.showModal ? <OrderPrintPreview data={this.state.modalData} /> : '' }
    </div>;
  }
}

export default OrderListNew;
