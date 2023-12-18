import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios';
import './index.css'

axios.defaults.baseURL = 'https://api.nasa.gov';
axios.defaults.params = {};
axios.defaults.params['api_key'] = 'INSERT_YOUR_API_KEY';
axios.defaults.params['thumbs'] = 'true';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
