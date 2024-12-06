import React, { useState } from "react";
import "../styles/OrderSummary.css";

const OrderSummary = ({ orders }) => {
  const [deliveryType, setDeliveryType] = useState("Makan/Minum Di Sini");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderId, setOrderId] = useState(generateRandomId());
  const [receiptNumber, setReceiptNumber] = useState(generateRandomId());

  // Function to generate a random alphanumeric ID
  function generateRandomId() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  const calculateTotal = () =>
    orders.reduce(
      (total, order) => total + (order.price || 0) * (order.quantity || 0),
      0
    );

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
  };

  const handlePayment = () => {
    setOrderId(generateRandomId()); // Generate new Order ID
    setReceiptNumber(generateRandomId()); // Generate new Receipt Number
    setIsPopupOpen(true); // Open the popup modal
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup modal
  };

  const handlePrint = () => {
    setOrderId(generateRandomId()); // Generate new Order ID
    setReceiptNumber(generateRandomId()); // Generate new Receipt Number
    window.print(); // Trigger print dialog
  };

  return (
    <div className="order-summary">
      <div className="order-header">
        <h2>Orders #{receiptNumber}</h2>
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
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <span className="item-name">{order.name}</span>
                <span className="item-price">
                  Rp {(order.price || 0).toLocaleString()}
                </span>
              </div>
              <div className="item-quantity">
                <span>x {order.quantity || 0}</span>
                <span>
                  Rp {((order.price || 0) * (order.quantity || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">No items added yet.</p>
        )}
      </div>

      <div className="order-total">
        <strong>Total:</strong>
        <span>Rp {calculateTotal().toLocaleString()}</span>
      </div>

      <button className="pay-button" onClick={handlePayment}>
        Bayar
      </button>

      {isPopupOpen && (
        <div className="payment-popup">
          <div className="popup-content">
            <div id="receipt-content">
              <h3>Payment Receipt</h3>
              <p>Receipt Number: #{receiptNumber}</p>
              <p>Order ID: #{orderId}</p>
              <p>Served By: SuasanaKopi_BI</p>
              <p>Collected By: SuasanaKopi</p>
              <p>------------------------------------------------------------------------------------------------</p>
              <p>Delivery Type: {deliveryType}</p>
              <div className="receipt-items">
                {orders.map((order, index) => (
                  <div key={index} className="receipt-item">
                    <span>
                      {order.name} x {order.quantity || 0}
                    </span>
                    <span>
                      Rp {((order.price || 0) * (order.quantity || 0)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <p>------------------------------------------------------------------------------------------------</p>
              <div className="receipt-total">
                <strong>Total:</strong>
                <span>Rp {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
            <div className="popup-actions">
              <button className="close-button" onClick={closePopup}>
                Close
              </button>
              <button className="print-button" onClick={handlePrint}>
                Print Receipt
              </button>
            </div>
          </div>
          <div className="popup-overlay" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
