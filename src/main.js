import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import Orders from './containers/orders';
import Login from './components/login';
import store from './redux/store/';
import { init } from './utils/init.js';
import ScrollToTop from './containers/scroll-to-top';
init(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
    document.getElementById('box')
);
