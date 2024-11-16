import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root and render the app with a trailing comma in the object
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, // Add trailing comma here
); // Proper closing with space before '}'

reportWebVitals();
