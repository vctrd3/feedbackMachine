import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios'
//setup redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
