import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Replace with the actual path to your App component file
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
