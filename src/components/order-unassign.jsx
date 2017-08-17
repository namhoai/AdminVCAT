import React from 'react';
import API from '../api/index';
import { Table, Input, message, Button } from 'antd';
import OrderDetail from './order-detail';
import OrderVendorList from './order-vendor-list';

const Search = Input.Search;

class OrderUnassign extends React.Component {
  constructor() {
    super();
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.assignOrders = this.assignOrders.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.state = {
      selectedRowKeys: [],
      orderDetailData: null,
      pageTotal: 0,
      queryKey: '',
      queryStatus: '',
      collapsed: false,
      orderID: null,
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [],
      loading: false,
      showModal: false,
      modalData: {
        confirmLoading: false,
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
              message.success('The order assignment operation was successful');
            } else {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.error('Order allocation operation failed！');
            }
          });
        },
        handleCancel: () => {
          this.hideDialog();
        }
      }
    };
  }
  componentDidMount() {
    document.title = 'Unassigned order';
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
  assignOrders() {
    console.log(this.state.selectedRowKeys.length);
    if (this.state.selectedRowKeys.length > 1) {
      message.error('This feature does not support batch operation！');
      return;
    }
    this.setState({
      ...this.state,
      orderID: this.state.selectedRowKeys,
      showModal: true
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
      unassignStatus: this.state.queryStatus,
      unassignKey: value,
      page: 1,
      pageSize: this.state.pagination.pageSize
    });
  }
  onChange(value) {
    this.setState({
      ...this.state,
      queryStatus: value,
      pagination: {
        ...this.state.pagination,
        current: 1
      }
    });
    this.request({
      unassignStatus: value,
      unassignKey: this.state.queryKey,
      page: 1,
      pageSize: this.state.pagination.pageSize
    });
  }
  request(payload) {
    this.setState({
      loading: true
    });

    API.getUnassignOrdersResource(payload).then((res) => {
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
      unassignStatus: this.state.queryStatus,
      unassignKey: this.state.queryKey
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
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
          orderDetailData: res.data.data
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
    }, {
      title: 'Assign',
      key: 'assign',
      dataIndex: 'assign',
      width: 80
    }];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<div>
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="Please enter the recipient of the query" onSearch={this.onSearch} />
        </div>
        <div style={{ float: 'left', display: 'flex' }}>
          <Button type="primary" icon="download" style={{ margin: '0 5px' }} onClick={this.assignOrders}>Assign orders</Button>
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
      { this.state.showModal ? <OrderVendorList data={this.state.modalData} /> : '' }
    </div>);
  }
}

export default OrderUnassign;
