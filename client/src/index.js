import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Navbar />
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
