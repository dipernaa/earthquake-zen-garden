import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'regenerator-runtime';
import AppContainer from './components/layout/AppContainer';
import './_theme.scss';

ReactDOM.render(
    <Router>
        <AppContainer />
    </Router>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}
