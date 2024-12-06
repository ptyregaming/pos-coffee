import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";

const Products = ({ activeCategory, addToOrder }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/api/viewproduk.php")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Terjadi kesalahan saat memuat data");
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.kategori_nama === activeCategory);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div>Produk tidak tersedia.</div>;
  }

  return (
    <div className="products">
      {filteredProducts.map((product, index) => (
        <div
          className="product-card"
          key={index}
          onClick={() =>
            addToOrder({
              name: product.produk_judul,
              price: product.produk_harga,
              quantity: 1,
            })
          }
        >
          <img src={product.produk_image} alt={product.produk_judul} />
          <h3>{product.produk_judul}</h3>
          <p>Rp {product.produk_harga.toLocaleString()}</p>
          <span>Tinggal {product.stock} porsi</span>
        </div>
      ))}
    </div>
  );
};

export default Products;
