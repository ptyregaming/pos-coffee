import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./pages/HomePage";

function App() {
  const [userId, setUserId] = useState(null); // State to store logged-in user ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route path="/homepage" element={<Homepage userId={userId} setUserId={setUserId} />} />
      </Routes>
    </Router>
  );
}

export default App;
