import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUserId }) => {
  const [userIdInput, setUserIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State for toggle between login/register
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    nama: "",
    alamat: "",
    nomorTelepon: "",
    level: "user",
  });
  const navigate = useNavigate();

  // Retrieve user data from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserIdInput(storedUserId);
    }
  }, []);

  // Function for login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!userIdInput || !passwordInput) {
      setError("Please enter both User ID and Password.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", userIdInput);
    formData.append("password", passwordInput);

    try {
      const response = await fetch("http://localhost/api/users_api.php?action=login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        alert("Login successful!");
        localStorage.setItem("userId", userIdInput); // Save userId to localStorage
        setUserId(userIdInput); 
        navigate("/homepage");
      } else {
        setError(result.data || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!registerData.username || !registerData.password || !registerData.nama || !registerData.alamat || !registerData.nomorTelepon) {
      setError("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/api/users_api.php?action=create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false); // Close the registration form
      } else {
        setError(result.data || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {isRegistering ? (
      
        <>
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
            <label>
              Username:
              <input
                type="text"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </label>
            <label>
              Nama:
              <input
                type="text"
                value={registerData.nama}
                onChange={(e) => setRegisterData({ ...registerData, nama: e.target.value })}
              />
            </label>
            <label>
              Alamat:
              <input
                type="text"
                value={registerData.alamat}
                onChange={(e) => setRegisterData({ ...registerData, alamat: e.target.value })}
              />
            </label>
            <label>
              Nomor Telepon:
              <input
                type="text"
                value={registerData.nomorTelepon}
                onChange={(e) => setRegisterData({ ...registerData, nomorTelepon: e.target.value })}
              />
            </label>
            <label>
              Level:
              <select
                value={registerData.level}
                onChange={(e) => setRegisterData({ ...registerData, level: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <br />
          <button onClick={() => setIsRegistering(false)}>Back to Login</button>
        </>
      ) : (
        
        <>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <label>
              User ID:
              <input
                type="text"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                disabled={isLoading}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                disabled={isLoading}
              />
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
            <br />
          <button onClick={() => setIsRegistering(true)}>Register</button>
        </>
      )}
    </div>
  );
};

export default Login;
