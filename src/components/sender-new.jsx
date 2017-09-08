import React from 'react';
import { Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import '../assets/less/sender-new.less';

const SenderNew = (props) => {
  return (<Card className="senderNew" title="Add a contact" style={{ width: 300, height: 210 }}>
    <a href="javascript:;" onClick={props.newSenderDlg} ><Icon type="plus" />Added</a>
  </Card>);
};

SenderNew.propTypes = {
  newSenderDlg: PropTypes.func
};
export default SenderNew;
