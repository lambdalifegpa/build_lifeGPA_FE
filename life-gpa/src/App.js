import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/signUp';
import HomePage from './components/homePage';




import './App.css';


  

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/signUp" render={props => <SignUp {...props} />} />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/home" render={props => <HomePage {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
