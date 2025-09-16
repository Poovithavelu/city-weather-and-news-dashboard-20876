import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// PUBLIC_INTERFACE
/**
 * Application entrypoint.
 * Mounts the React application under #root.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
