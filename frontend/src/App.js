import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./pages/HomePage";
import Dashboard from './pages/Dashboard';
import UserCRUD from './pages/UserCRUD';
import ProdukCRUD from './pages/ProdukCRUD';
import KategoriCRUD from './pages/KategoriCRUD';



function App() {
  const [userId, setUserId] = useState(null); // State to store logged-in user ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route path="/homepage" element={<Homepage userId={userId} setUserId={setUserId} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserCRUD />} />
        <Route path="/dashboard/produk" element={<ProdukCRUD />} />
        <Route path="/dashboard/kategori" element={<KategoriCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
