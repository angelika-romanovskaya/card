import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'reset-css'
import App from './App';
import configureStore from './redux/store'
import {Provider} from 'react-redux'

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
