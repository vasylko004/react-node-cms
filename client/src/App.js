import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DefaultPage from './containers/default';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import './materialize.min.css';
import './App.css';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

class App extends Component {
  render() {
    return (<Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={DefaultPage} />
          </Switch>
        </Router>
      </Provider>);
  }
}

export default App;
