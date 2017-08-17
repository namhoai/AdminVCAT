import React from 'react';
import API from '../api/index';
import { Table, message, Input } from 'antd';
import OrderDetail from './order-detail';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  key: 'id',
  dataIndex: 'id'
}, {
  title: 'Goods Name',
  key: 'goodsName',
  dataIndex: 'goodsName'
}, {
  title: 'Order ID',
  key: 'orderID',
  dataIndex: 'orderID'
}, {
  title: 'Nick name',
  key: 'nickname',
  dataIndex: 'nickname'
}, {
  title: 'Reciver',
  key: 'reciver',
  dataIndex: 'reciver'
}, {
  title: 'Phone',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: 'Address',
  key: 'address',
  dataIndex: 'address'
}, {
  title: 'Express',
  key: 'express',
  dataIndex: 'express'
}, {
  title: 'Assign',
  key: 'assign',
  dataIndex: 'assign',
  width: 100,
  fixed: 'right'
}, {
  title: 'Vendor',
  key: 'vendor',
  dataIndex: 'vendor',
  width: 100,
  fixed: 'right'
}];
class UnReturnVisitOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pageTotal: 0,
      selectedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      orderDetailData: {
        disableEdit: false
      },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    document.title = 'Did not return orders !';
    this.request({
      page: 1,
      pageSize: 10
    });
  }  
  request(payload) {
    this.setState({
      loading: true
    });

    API.getAssignedOrdersResource(payload).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          data: res.data.data,
          loading: false,
          pageTotal: res.data.total,
          selectedRowKeys: []
        });
      } else {
        this.setState({
          data: [],
          loading: false
        });
        message.error('Get unassigned order failed ！');
      }
    });
  }
  onRowClick(record) {
    API.getOrderDetailResource({ orderID: record.id }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          orderDetailData: {
            ...this.state.orderDetailData,
            ...res.data.data
          }
        });
      } else {
          message.error('Failed to get order details ！');
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
    this.setState({
      ...this.state,
      selectedRowKeys
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
    const pagination = {
      total: this.state.pageTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '30', '40', '100'],
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      onChange: this.onPaginationChange.bind(this),
      onShowSizeChange: this.onShowSizeChange.bind(this)
    };
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    return (<div>
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="Please enter the express number" onSearch={this.onSearch.bind(this)} />
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        scroll={{ x: 1500 }}
        rowSelection={rowSelection}
        onRowClick={this.onRowClick.bind(this)}
      />
      <OrderDetail {...this.state.orderDetailData} />
    </div>);
  }
}

export default UnReturnVisitOrders;
