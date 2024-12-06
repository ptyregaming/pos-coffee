import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../styles/Dashboard.css'; // Tambahkan file CSS untuk styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/dashboard/users">CRUD Users</Link>
          </li>
          <li>
            <Link to="/dashboard/produk">CRUD Products</Link>
          </li>
          <li>
            <Link to="/dashboard/kategori">CRUD Kategori</Link>
          </li>
          <li>
            <Link to="/crud-sales">CRUD Sales</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/dashboard/users" element={<h1>CRUD Users Page</h1>} />
        <Route path="/dashboard/produk" element={<h1>CRUD Products Page</h1>} />
        <Route path="/dashboard/kategori" element={<h1>CRUD Kategori Page</h1>} />
        <Route path="/crud-sales" element={<h1>CRUD Sales Page</h1>} />
      </Routes>
    </div>
  );
};

export default Dashboard;
