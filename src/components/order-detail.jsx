import React from 'react';
import PropTypes from 'prop-types';
import API from '../api/index';
import { connect } from 'react-redux';
import { Tabs, Row, Col, Input, Table, Button, Form, Cascader, Select } from 'antd';
import '../assets/less/order-detail.less';
import { toggleOrderDetail } from '../redux/actions/user';
import city from '../utils/city';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const columns = [{
  title: 'id',
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
  title: 'Nick Name',
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
  title: 'SendTime',
  key: 'sendTime',
  dataIndex: 'sendTime'
}, {
  title: 'Address',
  key: 'address',
  dataIndex: 'address'
}, {
  title: 'Express',
  key: 'express',
  dataIndex: 'express',
  width: 100,
  fixed: 'right'
}];

class OrderDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      senderList: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    API.getSendersResource().then((res) => {
      if (res.data.code === 200) {
        const rList = res.data.data.list;
        this.setState({
          senderList: rList
        });
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.saveOrderDetail(this.props.form.getFieldsValue());
  }
  toggleOrderDetail() {
    this.props.toggleOrderDetail();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="card-container" style={{ position: 'relative', minHeight: 15 }}>
      <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 10, cursor: 'pointer' }} onClick={this.toggleOrderDetail.bind(this)}>
        <Button type="primary">{this.props.showOrderDetail ? 'Hide order details' : 'Show order details'}</Button>
      </div>
      <div className={this.props.showOrderDetail ? 'show' : 'hide'}>
        <Form>
          <Tabs type="card">
            <TabPane tab="Basic Information" key="1">
              <div className="basic">
                <Row>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">Buyer message</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerMsg', {
                            initialValue: this.props.buyerMsg
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Seller Note</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('sellerMsg', {
                            initialValue: this.props.sellerMsg
                          })(
                            <textarea className="sellerMsg" rows="3" cols="20" disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">Buyer Nick Name</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerNickName', {
                            initialValue: this.props.buyerNickName
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Alipay</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerAliPay', {
                            initialValue: this.props.buyerAliPay
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Email</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerEmail', {
                            initialValue: this.props.buyerEmail
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">Order Number</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('orderNum', {
                            initialValue: this.props.orderNum
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Transaction time</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tradeTime', {
                            initialValue: this.props.tradeTime
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Alipay transaction number</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tradeNum', {
                            initialValue: this.props.tradeNum
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div style={{ marginTop: 20, height: 194 }}>
                  <Table
                    bordered
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    scroll={{ x: 1500, y: 160 }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Express information" key="2">
              <div className="express">
                <Row>
                  <Col className="item" span={12}>
                    <div className="item-detail">
                      <div className="title">Express delivery</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('express', {
                            initialValue: this.props.express
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Waybill Number</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('expressnumbers', {
                            initialValue: this.props.expressnumbers
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Sender</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('sender', {
                            initialValue: this.props.sender
                          })(
                            <Select disabled={this.props.disableEdit} >
                              {this.state.senderList.map(item => (
                                <Option key={item.id} value={item.sendName}>
                                  {item.sendName}
                                </Option>)
                              )}
                            </Select>
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={12}>
                    <div className="item-detail">
                      <div className="title">Receiver</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('receiver', {
                            initialValue: this.props.receiver
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">location</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('city', {
                            initialValue: this.props.city
                          })(
                            <Cascader
                              size="large"
                              style={{ width: '100%' }}
                              options={city}
                              placeholder="Please select an address"
                              disabled={this.props.disableEdit}
                            />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Address</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('address', {
                            initialValue: this.props.address
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Unit</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('company', {
                            initialValue: this.props.company
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Zip Code</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('zipcode', {
                            initialValue: this.props.zipcode
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Phone</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('phone', {
                            initialValue: this.props.phone
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Tel</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tel', {
                            initialValue: this.props.tel
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">Invoice</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('invoice', {
                            initialValue: this.props.invoice
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            { this.props.isAdmin ? <TabPane tab="Return Visible" key="3">
              <div className="express">
                <Row>
                  <Col className="item" span={24}>
                    <div className="item-detail">
                        <div className="title">Return Note</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('returnVisitMsg', {
                            initialValue: this.props.returnVisitMsg
                          })(
                            <textarea className="sellerMsg" rows="3" cols="20" disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane> : ''}
          </Tabs>
        </Form>
        <div className="clearfix" style={{ paddingTop: 10 }}>
          <Button type="primary" disabled={this.props.disableEdit} style={{ float: 'right' }} onClick={this.handleSubmit.bind(this)}>Save</Button>
        </div>
      </div>
    </div>);
  }
}
OrderDetail.propTypes = {
  sellerMsg: PropTypes.string.isRequired,
  buyerNickName: PropTypes.string.isRequired,
  buyerAliPay: PropTypes.string.isRequired,
  buyerEmail: PropTypes.string.isRequired,
  orderNum: PropTypes.number,
  tradeTime: PropTypes.string,
  tradeNum: PropTypes.number,
  express: PropTypes.string.isRequired,
  expressnumbers: PropTypes.number,
  receiver: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  city: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  phone: PropTypes.number,
  tel: PropTypes.string.isRequired,
  zipcode: PropTypes.number,
  invoice: PropTypes.string.isRequired,
  disableEdit: PropTypes.bool.isRequired
};
OrderDetail.defaultProps = {
  sellerMsg: '',
  buyerNickName: '',
  buyerAliPay: '',
  buyerEmail: '',
  orderNum: null,
  tradeTime: null,
  tradeNum: null,
  express: '',
  expressnumbers: null,
  receiver: '',
  sender: '',
  city: [],
  address: '',
  company: '',
  phone: null,
  tel: '',
  zipcode: null,
  invoice: '',
  disableEdit: false
};
function mapStateToProp(state) {
  return {
    showOrderDetail: state.userReducer.showOrderDetail,
    isAdmin: state.userReducer.isAdmin
  };
}
function mapDispatchToProp(dispatch) {
  return {
    toggleOrderDetail: () => {
      dispatch(toggleOrderDetail());
    }
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(Form.create()(OrderDetail));
