import React, { forwardRef } from "react";
import "../styles/Receipt.css";

const Receipt = forwardRef(({ orderDetails, storeDetails }, ref) => {
  const { date, orderNumber, items, subtotal, tax, total } = orderDetails;

  return (
    <div ref={ref} className="receipt">
      
      <div className="store-info">
        <h2>{storeDetails.name}</h2>
        <p>{storeDetails.address}</p>
        <p>{storeDetails.phone}</p>
      </div>

      
      <div className="divider"></div>

     
      <div className="order-info">
        <p>Date: {date}</p>
        <p>Receipt Number: {orderNumber}</p>
        <p>Order ID: {orderDetails.id}</p>
      </div>

      <div className="divider"></div>

    
      <div className="items">
        {items.map((item, index) => (
          <div key={index} className="item">
            <p>
              <strong>{item.name}</strong>
              <br />
              {item.details} x{item.quantity} @Rp {item.price.toLocaleString()}
            </p>
            <p>Rp {item.total.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

 
      <div className="summary">
        <p>
          Subtotal <span>Rp {subtotal.toLocaleString()}</span>
        </p>
        <p>
          PB1 (Included) <span>Rp {tax.toLocaleString()}</span>
        </p>
        <p className="total">
          Total <span>Rp {total.toLocaleString()}</span>
        </p>
      </div>

      <div className="divider"></div>


      <div className="footer">
        <p>Thank you for visiting!</p>
        <p>{storeDetails.website}</p>
      </div>
    </div>
  );
});

export default Receipt;
