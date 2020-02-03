import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import AssetView from './AssetView';
import { Navbar } from 'react-bootstrap';


ReactDOM.render(
    <div className="MainContainer">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
            iShaer
            </Navbar.Brand>
        </Navbar>
        <Router>
            <Route exact path="/" component={ App } />
            <Route exact path="/:code" component={ AssetView } />
        </Router>
    </div>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
