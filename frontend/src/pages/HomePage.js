
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products";
import OrderSummary from "../components/OrderSummary";
import "../styles/HomePage.css";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("Handcrafted Espresso");
  const [orders, setOrders] = useState([]); 

  const categories = [
    "Handcrafted Espresso",
    "Signature Coffee",
    "Non Coffee",
    "Mocktail",
    "Add Ons",
    "Bread",
  ];

  
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
          <h2>Pilih Kopimu</h2>
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
      <OrderSummary orders={orders} />
    </div>
  );
};

export default HomePage;
