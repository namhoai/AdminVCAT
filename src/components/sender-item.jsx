import React from 'react';
import { Card, Badge } from 'antd';
import '../assets/less/sender-item.less';
import PropTypes from 'prop-types';

const SenderItem = ({ props, editSenderDlg, delDlg }) => {
  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  const title = (<Badge count={props.default ? 'default' : ''}>
    <span style={{ fontSize: 18 }}> {props.sendName} </span>
  </Badge>);
  return (<Card className="senderItem" title={title} extra={<div><a href="javascript:;" onClick={editSenderDlg}>Edit</a><a href="javascript:;" onClick={delDlg} style={{ marginLeft: 8, color: 'red' }}>delete</a></div>} style={{ width: 300, height: 210 }}>
    <p style={style}>location：{props.sendcity[0]}{props.sendcity[1]}{props.sendcity[2]}</p>
    <p style={style}>Street address：{props.sendaddr}</p>
    <p style={style}>Unit：{props.sendcompany}</p>
    <p style={style}>Zip code：{props.sendzipcode}</p>
    <p style={style}>Mobile Phone：{props.sendmobile}</p>
    <p style={style}>Phone：{props.sendtel}</p>
  </Card>);
};

SenderItem.propTypes = {
  props: PropTypes.object.isRequired,
  editSenderDlg: PropTypes.func.isRequired,
  delDlg: PropTypes.func.isRequired
};

export default SenderItem;
