import React from 'react';
import App from './app';
// import CDashBoard from '../components/dashboard';
// import CNTG from '../app/cntg/components';
import Member from '../app/member/components';

const DashBoard = () => {
  return (<div>
    <App>
      <Member />
    </App>
  </div>);
};

export default DashBoard;
