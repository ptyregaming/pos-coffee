import React, { useState } from "react";
import "../styles/OrderSummary.css";

const OrderSummary = ({ orders }) => {
  const [deliveryType, setDeliveryType] = useState("Makan/Minum Di Sini");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const calculateTotal = () =>
    orders.reduce((total, order) => total + order.price * order.quantity, 0);

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
  };

  const handlePayment = () => {
    setIsPopupOpen(true); // Open the popup modal
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup modal
  };

  return (
    <div className="order-summary">
      <div className="order-header">
        <h2>Orders #34562</h2>
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
                  Rp {order.price.toLocaleString()}
                </span>
              </div>
              <div className="item-quantity">
                <span>x {order.quantity}</span>
                <span>
                  Rp {(order.price * order.quantity).toLocaleString()}
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
            <h3>Payment Confirmation</h3>
            <p>
              Total Payment: <strong>Rp {calculateTotal().toLocaleString()}</strong>
            </p>
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
            <button className="confirm-button" onClick={() => alert("Payment Successful!")}>
              Confirm Payment
            </button>
          </div>
          <div className="popup-overlay" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
