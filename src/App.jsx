import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerUI from './pages/customer/CustomerUI';
import AdminUI from './pages/admin/AdminUI';
import NotFound from './NotFound';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="*" element={<CustomerUI />} />
          <Route
            exact
            path="/admin/*"
            element={
              // <AdminPrivateRoute>
              <AdminUI />
              // </AdminPrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
