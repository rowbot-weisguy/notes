import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

/*
  Routes
*/

var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={Login} />
        <Route path="/:userId" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
