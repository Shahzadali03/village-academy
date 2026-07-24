import React from 'react';
import ReactDOM from 'react-dom/client';
import { initTheme } from './context/ThemeContext';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/custom.css';
import './assets/css/style.css';
import { Provider } from 'react-redux';
import store from './Redux/store';

initTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
