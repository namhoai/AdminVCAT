import React from 'react';
import App from './app';
// import CDashBoard from '../components/dashboard';
// import CNTG from '../app/cntg/components';
import Member from '../app/member/components/MemberList/MemberListContainer';
import Main from '../app/Main/index';

const DashBoard = () => {
  return (<div>
    <Main>
      <Member />
      {/*<CNTG />*/}
    </Main>
  </div>);
};

export default DashBoard;
