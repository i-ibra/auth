import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../NavBar';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Home from '../../componentes/Home';
import './style.css';

class HomeLayout extends Component {
  render() {
    return (
        <Router>
          <div>
            <Navbar/>
              <Route exact path="/" component={ Home } />
              <div className="container">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
              </div>
          </div>
        </Router>
    );
  }
}

export default HomeLayout;