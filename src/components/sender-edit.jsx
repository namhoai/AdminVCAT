import React from 'react';
import { Modal, Form, Button, Input, Checkbox, Cascader } from 'antd';
import city from '../utils/city';
import '../assets/less/dialog.less';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
class SenderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.form.validateFields((err) => {
      if (!err) {
        this.props.data.handleOk(this.props.form.getFieldsValue());
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const formItemLayoutLast = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    };

    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-290px' }}
      title={this.props.data.title}
      onOk={this.props.data.handleOk}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="back" size="large" onClick={this.props.data.handleCancel}>
        Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={this.props.data.confirmLoading}
          onClick={this.handleSubmit}
        >
          OK
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <FormItem label="Contact person" {...formItemLayout}>
          {getFieldDecorator('sendName', {
            initialValue: this.props.data.sendName,
            rules: [
              {
                required: true,
                message: 'The contact can not be empty！'
              }
            ]
          })(<Input placeholder="Please enter a contact " />)}
        </FormItem>
        <FormItem label="location" {...formItemLayout}>
          {getFieldDecorator('sendcity', {
            initialValue: this.props.data.sendcity,
            rules: [
              {
                required: true,
                message: 'The location can not be empty ！'
              }
            ]
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="The select an address"
          />)}
        </FormItem>
        <FormItem label="Street address" {...formItemLayout}>
          {getFieldDecorator('sendaddr', {
            initialValue: this.props.data.sendaddr,
            rules: [
              {
                required: true,
                message: 'The Street address can not be empty ！'
              }
            ]
          })(
            <Input placeholder="Please enter the street address !" />
          )}
        </FormItem>
        <FormItem label="The company" {...formItemLayout}>
          {getFieldDecorator('sendcompany', {
            initialValue: this.props.data.sendcompany
          })(<Input placeholder="Please enter the company name" />)}
        </FormItem>
        <FormItem label="Zip code" {...formItemLayout}>
          {getFieldDecorator('sendzipcode', {
            initialValue: this.props.data.sendzipcode
          })(<Input placeholder="Please enter the zip code !" />)}
        </FormItem>
        <FormItem label="Mobile phone" {...formItemLayout}>
          {getFieldDecorator('sendmobile', {
            initialValue: this.props.data.sendmobile,
            rules: [
              {
                required: true,
                message: 'The phone number can not be empty！'
              }
            ]
          })(<Input placeholder="Please enter phone number" />)}
        </FormItem>
        <FormItem label="Tel Phone" {...formItemLayout}>
          {getFieldDecorator('sendtel', {
            initialValue: this.props.data.sendtel
          })(<Input placeholder="Please enter your phone number !" />)}
        </FormItem>
        <FormItem {...formItemLayoutLast}>
          <Checkbox checked={this.props.data.default} onChange={this.props.data.onChange}>设置为默认发货地址</Checkbox>
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator('id', {
            initialValue: this.props.data.id
          })(<Input type="hidden" />)}
        </FormItem>
      </Form>
    </Modal>);
  }
}

SenderEdit.propTypes = {
  data: PropTypes.object.isRequired
};

export default Form.create()(SenderEdit);
