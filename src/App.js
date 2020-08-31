import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';

//import Header from './components/shared/Header';
import Navigation from './components/shared/Navigation'
import Footer from './components/shared/Footer';
import Container from './components/shared/Container';

function App() {
  return (
    <Router>
    <div className="App">
      {/* <Navigation /> */}
      <Container />
      {/* <Footer /> */}
    </div>
    </Router>
  );
}

export default App;
