import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/less/nomatch.less';

const Nomatch = () => {
  return (<div className="nomatch">
    <section>
      <h1>404</h1>
      <p>
        <Link to="/">Return to the home page</Link>
      </p>
    </section>
  </div>);
};

export default Nomatch;
