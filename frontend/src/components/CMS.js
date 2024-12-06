import React, { useState } from "react";
import "./CMS.css";

const CMS = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Espresso", price: 20000 },
    { id: 2, name: "Doppio", price: 25000 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editProductId, setEditProductId] = useState(null);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setNewProduct({ name: "", price: "" });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (id) => {
    const product = products.find((product) => product.id === id);
    setNewProduct(product);
    setEditProductId(id);
  };

  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editProductId ? { ...product, ...newProduct } : product
      )
    );
    setNewProduct({ name: "", price: "" });
    setEditProductId(null);
  };

  return (
    <div className="cms-container">
      <h2>Content Management System</h2>
      <div className="cms-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        {editProductId ? (
          <button onClick={handleUpdateProduct}>Update Product</button>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Rp {product.price}
            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CMS;
