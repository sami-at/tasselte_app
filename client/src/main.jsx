import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
)
