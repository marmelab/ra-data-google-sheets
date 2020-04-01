import React from 'react';
import ReactDOM from 'react-dom';
import { loadGoogleApi } from 'ra-data-google-sheets';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

loadGoogleApi().then(() => {
    console.log('Google API Loaded');

    ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
