import React from 'react';
import API from '../api/index';
import { Table, Input, message, Button, notification } from 'antd';
import mLODOP from '../utils/print.js';
import OrderDetail from './order-detail';
import OrderPrintPreview from './order-print-preview';

const Search = Input.Search;

class OrdersBack extends React.Component {
  constructor() {
    super();
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.printOrder = this.printOrder.bind(this);
    this.state = {
      selectedRowKeys: [],
      orderDetailData: {
        disableEdit: true
      },
      queryKey: '',
      queryStatus: '',
      collapsed: false,
      orderID: null,
      pageTotal: 0,
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [],
      loading: false,
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

          API.savePrintOptionResource({ ...payload }).then((res) => {
            if (res.data.code === 200) {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.success('success !');
            } else {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.error('error ！');
            }
          });
        },
        handleCancel: () => {
          this.hideDialog();
        },
        handlePreview: (payload) => {
          API.savePrintOptionResource({ ...payload }).then((res) => {
            if (res.data.code === 200) {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              this.startPrint();
              message.success('success !');
            } else {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.error('error ！');
            }
          });
        }
      }
    };
  }
  componentDidMount() {
    document.title = 'Return Order';
    this.request({
      page: 1,
      pageSize: 10
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
      modalData: {
        ...this.state.modalData,
        orderSelectList: this.state.selectedRowKeys.join()
      },
      showModal: true
    });
  }
  startPrint() {
    if (!mLODOP.getMLodop()) {
      notification.error({
        message: 'Error message',
        description: 'You have not installed the print plugin, or have not run the print program. Go to the printer management page to download, install, test ！',
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
            message: 'Error Message',
              description: 'The default printer for the current settings is not found. Go to the "Print Settings" page and reset the default printer ！'
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
  request(payload) {
    this.setState({
      loading: true
    });

    API.getBackOrdersResource(payload).then((res) => {
      this.setState({
        ...this.state,
        selectedRowKeys: [],
        data: res.data.data,
        loading: false,
        pageTotal: res.data.total
      });
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
  onRowClick(record) {
    API.getOrderDetailResource({ orderID: record.id }).then((res) => {
      console.log(res.data.data);
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          pageTotal: res.data.total,
          orderDetailData: {
            ...this.state.orderDetailData,
            ...res.data.data
          }
        });
      } else {
        message.error('Order allocation operation failed！');
      }
    });
  }
  render() {
    const pagination = {
      total: this.state.pageTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '30', '40', '100'],
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      onChange: this.onPaginationChange,
      onShowSizeChange: this.onShowSizeChange
    };
    const columns = [{
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      width: 50
    }, {
      title: 'Goods Name',
      key: 'goodsName',
      dataIndex: 'goodsName',
      width: 200
    }, {
      title: 'Order ID',
      key: 'orderID',
      dataIndex: 'orderID',
      width: 80
    }, {
      title: 'Nick Name',
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
    }];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<div className="orderListBack">
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="Please enter the express number " onSearch={this.onSearch} />
        </div>
        <div style={{ float: 'left', display: 'flex' }}>
          <Button type="primary" icon="printer" style={{ margin: '0 5px' }} onClick={this.printOrder}>Print Order</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowSelection={rowSelection}
        scroll={{ x: 1500 }}
        onRowClick={this.onRowClick}
      />
      <OrderDetail {...this.state.orderDetailData} />
      { this.state.showModal ? <OrderPrintPreview data={this.state.modalData} /> : '' }
    </div>);
  }
}

export default OrdersBack;
