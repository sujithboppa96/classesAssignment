import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import App from './App';
// import styles from './index.css'

import rootReducer from './reducers/reducers'

export const store = createStore(rootReducer)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <div className="text">
        <App />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));