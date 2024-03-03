import React from 'react';
import { Routes, Route } from 'react-router-dom';

function AdminUI() {
  return (
    <div className="adminUI">
      <Routes>
        <Route exact path="*" element={'adminUI under construction'} />
      </Routes>
    </div>
  );
}

export default AdminUI;
