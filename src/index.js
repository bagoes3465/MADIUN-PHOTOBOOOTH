// src/index.js
// Entry point untuk React application

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Optional: Import styles tambahan
// import './styles/globals.css';
// import './styles/animations.css';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Web Vitals untuk performance monitoring
// Uncomment jika ingin menggunakan
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);