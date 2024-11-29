
import React from "react";
import "../styles/Products.css";
import Image from '../pictures/espresso.jpg';

const Products = ({ activeCategory, addToOrder }) => {
  const products = [
    {
      name: "Espresso",
      price: 20000,
      stock: 20 ,
      image: "{Image}",
      category: "Handcrafted Espresso",
    },
    {
      name: "Doppio",
      price: 25000,
      stock: 11,
      image: "https://via.placeholder.com/100",
      category: "Handcrafted Espresso",
    },
    {
      name: "Caffe Americano",
      price: 30000,
      stock: 16,
      image: "https://via.placeholder.com/100",
      category: "Signature Coffee",
    },
    // Add more products as needed
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

      
  return (
    <div className="products">
      {filteredProducts.map((product, index) => (
        <div
          className="product-card"
          key={index}
          onClick={() => addToOrder(product) && product.stock - 1} 
          
          disabled={product.stock === 0}
          
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Rp {product.price.toLocaleString()}</p>
          <span>Tinggal {product.stock} porsi</span>
        </div>
      ))}
    </div>
  );
};

export default Products;
