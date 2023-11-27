import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Replace with the actual path to your App component file

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
