import React from 'react';
import Home from './home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from './bookshow/BookShow';
export default class Controller extends React.Component {

    baseUrl = 'http://localhost:8085/api/v1/';

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" render={(props) => (<Home {...props} baseUrl={this.baseUrl} />)} />
                    <Route path="/book/:id" render={(props) => (<BookShow {...props} baseUrl={this.baseUrl} />)} />
                </React.Fragment>
            </Router>
        )
    }
}