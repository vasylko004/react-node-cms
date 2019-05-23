import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DefaultPage from './containers/default';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import LoginPage from './containers/admin/login';
import {IntlProvider} from "react-intl";
import createSagaMiddleware from 'redux-saga';
import messages_en from './translations/en';
import reducer from './reducers';
import actionsSaga from './sagas';
import Header from './containers/admin/header';
import DashboardPage from './containers/admin/dashboard';
import { composeWithDevTools } from 'redux-devtools-extension';
import './materialize.min.css';
import './App.css';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(actionsSaga);

class App extends Component {
  render() {
    return (<Provider store={store}>
      <IntlProvider locale="en" messages={messages_en}>
        <Router>

          <Route path="/admin/" component={Header} />
          <Switch>
            <Route exact path="/" component={DefaultPage} />
            <Route exact path="/admin/login" component={LoginPage} />
            <Route path="/admin/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </IntlProvider>
    </Provider>);
  }
}

export default App;
