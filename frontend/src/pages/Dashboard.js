import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../styles/Dashboard.css'; // Add your custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [penjualanData, setPenjualanData] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch sales data from the API
  useEffect(() => {
    fetch('http://localhost/api/viewpenjualan.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching sales data:', data.error);
        } else {
          setPenjualanData(data); // Set the fetched data to the state
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
        </button>
        <h1>Dashboard</h1>
      </header>

      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
        <li>
            <Link to="/homepage" onClick={() => setIsMenuOpen(false)}>
              Homepage
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" onClick={() => setIsMenuOpen(false)}>
              CRUD Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/produk" onClick={() => setIsMenuOpen(false)}>
              CRUD Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/kategori" onClick={() => setIsMenuOpen(false)}>
              CRUD Kategori
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/dashboard/users" element={<h1>CRUD Users Page</h1>} />
          <Route path="/dashboard/produk" element={<h1>CRUD Products Page</h1>} />
          <Route path="/dashboard/kategori" element={<h1>CRUD Kategori Page</h1>} />
          <Route path="/homepage" element={<h1>Homepage</h1>} />
        </Routes>

        <div className="sales-table">
          <h2>Hasil Penjualan</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Penjualan ID</th>
                <th>Tanggal Pembelian</th>
                <th>Total</th>
                <th>Metode</th>
                <th>User</th>
                <th>Detail Penjualan ID</th>
                <th>Product ID</th>
                <th>Jumlah</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {penjualanData.length > 0 ? (
                penjualanData.map((item) => (
                  <tr key={item.penjualan_id}>
                    <td>{item.penjualan_id}</td>
                    <td>{item.tanggal_pembelian}</td>
                    <td>{item.total}</td>
                    <td>{item.metode}</td>
                    <td>{item.user_name}</td>
                    <td>{item.detail_penjualan_id}</td>
                    <td>{item.product_id}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No sales data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
