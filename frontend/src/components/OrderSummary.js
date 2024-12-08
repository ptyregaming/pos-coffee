import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/OrderSummary.css";

const OrderSummary = ({ orders, userId }) => {
  const [deliveryType, setDeliveryType] = useState("Makan/Minum Di Sini");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDbId, setUserDbId] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const randomSixDigit = () => Math.floor(100000 + Math.random() * 900000);

  // Function to calculate the total price of the order
  const calculateTotal = () =>
    orders.reduce(
      (total, order) => total + (order.price || 0) * (order.quantity || 0),
      0
    );

  // Function to handle delivery type change
  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
  };

  // Fetch userId from API
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/loginuser.php?username=${userId}`
        );

        if (response.data.status === "success" && response.data.data) {
          setUserDbId(response.data.data.id);
        } else {
          console.error("User not found:", response.data.message);
          alert("User not found. Please check your username.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserId();
  }, [userId]);

  // Function to handle payment
  const handlePayment = async () => {
    if (!userDbId) {
      alert("User ID is not available. Please try again.");
      return;
    }

    const total = calculateTotal();
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date YYYY-MM-DD

    const payload = {
      penjualan_id: randomSixDigit(),
      user_id: userDbId, // User ID from the database
      tanggal_pembelian: formattedDate,
      metode: deliveryType,
      total: total,
    };

    console.log("Payload being sent:", payload); // Log JSON payload

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost/api/insertpenjualan.php",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        console.log("Order saved successfully:", response.data);
        const savedPenjualanId = response.data.penjualan_id; // Get the saved order ID

        // Call the function to save order details
        await saveOrderDetails(savedPenjualanId);

        setReceiptData({
          ...payload,
          items: orders,
          total: total,
        });
        setIsPopupOpen(true);
      } else {
        console.error("Error occurred:", response.data);
        alert("An error occurred while saving data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save order details to insertdetail.php
  const saveOrderDetails = async (penjualanId) => {
    try {
      for (let order of orders) {
        const detailPayload = {
          detail_penjualan_id: randomSixDigit(),
          penjualan_id: penjualanId,
          product_id: order.product_id, // Using the product_id
          jumlah: order.quantity,
          subtotal: order.price * order.quantity,
        };

        console.log("Payload being sent:", detailPayload); // Log JSON payload

        const response = await axios.post(
          "http://localhost/api/insertdetail.php",
          detailPayload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 201) {
          console.log(`Detail for product ${order.name} saved successfully.`);
        } else {
          console.error(`Failed to save detail for product ${order.name}:`, response.data);
        }
      }
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to print receipt
  const printReceipt = () => {
    const printContent = document.getElementById("receipt").innerHTML;
    const newWindow = window.open("", "", "width=600,height=400");
    newWindow.document.write("<html><head><title>Receipt</title></head><body>");
    newWindow.document.write(printContent);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="order-summary">
      <div className="order-header">
        <h2>Order Summary</h2>
        <div className="delivery-options">
          <button
            className={deliveryType === "Makan/Minum Di Sini" ? "active" : ""}
            onClick={() => handleDeliveryTypeChange("Makan/Minum Di Sini")}
          >
            Makan/Minum Di Sini
          </button>
          <button
            className={deliveryType === "Dibungkus" ? "active" : ""}
            onClick={() => handleDeliveryTypeChange("Dibungkus")}
          >
            Dibungkus
          </button>
          <button
            className={deliveryType === "Dikirim" ? "active" : ""}
            onClick={() => handleDeliveryTypeChange("Dikirim")}
          >
            Dikirim
          </button>
        </div>
      </div>

      <div className="order-items">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <span>
              {order.name} x {order.quantity}
            </span>
            <span>Rp {(order.price * order.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="order-total">
        <strong>Total:</strong> Rp {calculateTotal().toLocaleString()}
      </div>

      <button className="pay-button" onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Processing..." : "Bayar"}
      </button>

      {isPopupOpen && receiptData && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Pembayaran Berhasil!</h3>
            <div id="receipt" className="receipt">
              <h4>Receipt</h4>
              <p><strong>ID Pembelian:</strong> {receiptData.penjualan_id}</p>
              <p><strong>Tanggal:</strong> {receiptData.tanggal_pembelian}</p>
              <p><strong>Metode Pengiriman:</strong> {receiptData.metode}</p>
              <h5>Items:</h5>
              <ul>
                {receiptData.items.map((order, index) => (
                  <li key={index}>
                    {order.name} x {order.quantity} - Rp {(order.price * order.quantity).toLocaleString()}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> Rp {receiptData.total.toLocaleString()}</p>
            </div>
            <button onClick={closePopup}>Tutup</button>
            <button onClick={printReceipt}>Print Receipt</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
