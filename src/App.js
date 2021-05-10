import React from 'react';
import { Router } from 'react-router-dom'

import configureStore from "./redux/store/configuration";
import { Provider } from 'react-redux'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

import history from '../src/history'
//import Navigation from './components/shared/Navigation'
import Container from './components/shared/Container';
import './App.css';

const store = configureStore()

Amplify.configure(awsconfig)

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">          
          <Container />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
