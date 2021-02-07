import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore,compose } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from "redux-thunk" 


const store = createStore(
    allReducer,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
, document.getElementById('root'));
