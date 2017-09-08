import React from 'react';
import { Modal, Button, Input, Select, Form } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }
  handleOk() {
    this.props.data.handleOk();
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-289px' }}
      title={this.props.data.title}
      onOk={this.handleOk.bind(this)}
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
          onClick={this.handleOk.bind(this)}
        >
          OK
        </Button>
      ]}
    >
      <Form layout="vertical">
        <FormItem label="User name" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: this.props.userName
          })(
            <Input placeholder="please enter user name" disabled={this.props.data.disableUsername} />
          )}
        </FormItem>
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: this.props.userName
          })(
            <Input placeholder="Please enter your password" disabled={this.props.data.disableUsername} />
          )}
        </FormItem>
        <FormItem label="Select location" {...formItemLayout}>
          {getFieldDecorator('wareHouse', {
            initialValue: 'Guangdong Province, Guangzhou City Science and Technology Road on the 1st warehouse 1 warehouse'
          })(
            <Select>
              <Option key="1" value="Guangdong Province, Guangzhou City Science and Technology Road on the 1st warehouse 1 warehouse">
                Guangdong Province, Guangzhou City Science and Technology Road on the 1st warehouse 1 warehouse
              </Option>
              <Option key="2" value="Mianyang City, Sichuan Province, Mianxing East Road on the 1st warehouse 11 warehouse">
                Mianyang City, Sichuan Province, Mianxing East Road on the 1st warehouse 11 warehouse
              </Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Form.create()(UserAdd);
