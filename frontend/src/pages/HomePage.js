import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products";
import OrderSummary from "../components/OrderSummary";
import "../styles/HomePage.css";

const API_URL = "http://localhost/api";

const HomePage = ({ userId, setUserId }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Handcrafted Espresso");
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState(""); 
  const navigate = useNavigate();

  
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/kategori_api.php?action=read`);
      const data = await response.json();
      if (data.status === "success") {
        setCategories(data.data.map((item) => item.kategori_nama));
      } else {
        alert("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/users_api.php?action=getUserInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setUserName(result.data.username); // Set userName from the API response
      } else {
        console.error("Failed to fetch user info:", result.message);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };


  useEffect(() => {
    fetchCategories();
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); 
    }
  }, [setUserId]);


  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      // Ensure userId is passed correctly
      console.log("Logging out userId:", userId);

      const response = await fetch(`${API_URL}/users_api.php?action=logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Logout successful!");
        setUserId(null); // Set userId to null in state
        localStorage.removeItem("userId"); // Remove userId from localStorage
        navigate("/"); // Redirect to login page
      } else {
        alert(result.data || "Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong. Please try again.");
    }
  };

 
  const addToOrder = (product) => {
    const existingOrder = orders.find((order) => order.name === product.name);

    if (existingOrder) {
      setOrders(
        orders.map((order) =>
          order.name === product.name
            ? { ...order, quantity: order.quantity + 1 }
            : order
        )
      );
    } else {
      setOrders([...orders, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="homepage">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <h2>Choose Your Coffee</h2>
          {userId && (
            <p className="userid">
              <strong>User ID:</strong> <br /> {userId}{" "}
              {userName && (
                <span>
                  (<strong>{userName}</strong>)
                </span>
              )}
            </p>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <Products activeCategory={activeCategory} addToOrder={addToOrder} />
      </main>
      <OrderSummary orders={orders} userId={userId} />
    </div>
  );
};

export default HomePage;
