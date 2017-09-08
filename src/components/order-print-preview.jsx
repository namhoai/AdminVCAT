import React from 'react';
import API from '../api/index';
import { Modal, Button, Table, Form, Input, Select, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';
import '../assets/less/order-print-preview.less';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
  title: 'Order ID',
  key: 'orderID',
  dataIndex: 'orderID',
  width: 50
}, {
  title: 'Goods Name',
  key: 'goodsName',
  dataIndex: 'goodsName',
  width: 80
}, {
  title: 'Express',
  key: 'express',
  dataIndex: 'express',
  width: 80
}, {
  title: 'Express Express',
  key: 'expressNum',
  dataIndex: 'expressNum',
  width: 80
}
];
class OrderPrintPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      loading: false,
      childrensList: [],
      senderList: [],
      paperPaddingLeft: null,
      paperPaddingRight: null,
      paperPaddingUp: null,
      paperPaddingDown: null,
      express: '',
      expressNum: null,
      sortInter: null,
      printer: ''
    };
    this.handleOk = this.handleOk.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }
  componentDidMount() {
    window.LODOP.Create_Printer_List(document.getElementById('printerChoose'));
    const optionList = document.getElementsByTagName('option');
    const tempList = [];
    const length = optionList.length;
    for (let index = 0; index < length; index += 1) {
      tempList.push({
        key: optionList[index].value,
        printer: optionList[index].text
      });
    }
    this.setState({
      childrensList: tempList
    });
    this.request();
  }
  request() {
    this.setState({
      loading: true
    });
    // Get the sender information
    API.getSendersResource().then((res) => {
      if (res.data.code === 200) {
        this.setState({
          senderList: res.data.data.list
        });
      } else {
        this.setState({
          datas: []
        });
        message.error('Failed to get sender information！');
      }
    });
    // Get the order list
    API.getPrintOrderListResource({
      orderID: this.props.data.orderSelectList
    }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          tableData: res.data.data
        });
      } else {
        this.setState({
          data: []
        });
        message.error('Failed to get order information！');
      }
    });
    // Get print details
    API.getPrintOptionResource().then((res) => {
      if (res.data.code === 200) {
        this.setState({
          ...res.data.data
        });
      } else {
        message.error('Failed to get order information！');
      }
    });
  }
  handleOk() {
    const fields = this.props.form.getFieldsValue();
    const newFields = { ...fields, startNum: fields.startNum + fields.sortInter };
    this.props.data.handleOk(newFields);
  }
  handlePreview() {
    const fields = this.props.form.getFieldsValue();
    const newFields = { ...fields, startNum: fields.startNum + fields.sortInter };
    this.props.data.handlePreview(newFields);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const formItemInlineLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const formItemInlineLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const childrens = this.state.childrensList.map(item => <Option key={item.key} value={item.printer}>{item.printer}</Option>);
    let defaultSender = '1';
    this.state.senderList.forEach((item) => { if (item.default) defaultSender = item.id.toString(); });
    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-335px' }}
      title="Print express delivery"
      onOk={this.handleOk}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="preview" size="large" onClick={this.handlePreview}>
          Print and save
        </Button>,
        <Button
          key="submit"
          size="large"
          loading={this.props.data.confirmLoading}
          onClick={this.handleOk}
        >
          Save
        </Button>,
        <Button key="cancel" size="large" onClick={this.props.data.handleCancel}>
        Cancel
        </Button>
      ]}
    >
      <Table
        bordered
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.tableData}
        scroll={{ x: 1500, y: 160 }}
      />
      <Form>
        <FormItem label="printer" {...formItemLayout}>
          {getFieldDecorator('printer', {
            initialValue: this.state.printer
          })(
            <Select>
              {childrens}
            </Select>
          )}
        </FormItem>
        <FormItem label="Sender" {...formItemLayout}>
          {getFieldDecorator('sender', {
            initialValue: defaultSender
          })(
            <Select>
              {this.state.senderList.map(item => <Option key={item.id} value={item.id.toString()}>{ item.sendName + ' ' + item.sendcity[0] + item.sendcity[1] + item.sendcity[2] + ' ' + item.sendaddr}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem label="Express" {...formItemLayout}>
          {getFieldDecorator('express', {
            initialValue: this.state.express
          })(
            <Select>
              <Option value="yt">Yuantong Express</Option>
              <Option value="sf">SF Express</Option>
                <Option value="zt">In the courier</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="Start the waybill number" {...formItemLayout}>
          <FormItem label="" className="inline" style={{ width: 294 }}>
            {getFieldDecorator('startNum', {
              initialValue: this.state.expressNum
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Ascending order" className="inline" {...formItemInlineLayout1}>
            {getFieldDecorator('sortInter', {
              initialValue: this.state.sortInter
            })(
              <InputNumber min={1} max={10} />
            )}
          </FormItem>
        </FormItem>
        <FormItem label="Paper margins" {...formItemLayout}>
          <FormItem label="on" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingUp', {
              initialValue: this.state.paperPaddingUp
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="under" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingDown', {
              initialValue: this.state.paperPaddingDown
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="left" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingLeft', {
              initialValue: this.state.paperPaddingLeft
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="right" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingRight', {
              initialValue: this.state.paperPaddingRight
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <span>(cm)</span>
        </FormItem>
      </Form>
      <select id="printerChoose" style={{ display: 'none' }} />
    </Modal>);
  }
}
OrderPrintPreview.propTypes = {
  data: PropTypes.object.isRequired
};
export default Form.create()(OrderPrintPreview);
