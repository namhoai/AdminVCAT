import React from 'react';
import '../assets/less/app.less';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    debugger;
    return (
        <div style={{ height: '100vh' }}>
            {this.props.children}
        </div>
    );
  }
}

export default App;
