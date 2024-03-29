import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render((
<BrowserRouter basename="/GLARE-editor">
  <App />
  <ToastContainer />
</BrowserRouter>
), document.getElementById('root'));
