import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import configureStore from "./redux/store/configuration";
import { Provider } from 'react-redux'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

//import Navigation from './components/shared/Navigation'
import Container from './components/shared/Container';

const store = configureStore()

//export const history = useHistory();

Amplify.configure(awsconfig)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">          
          <Container />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
