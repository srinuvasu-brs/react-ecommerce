import React, { useState } from "react";
import "./Ecommerce.css";

const ShopItem = ({ title, price, image, addToCart }) => {
  return (
    <div className="shop-item">
      <span className="shop-item-title">{title}</span>
      <img className="shop-item-image" src={image} alt={title} />
      <div className="shop-item-details">
        <span className="shop-item-price fw-bolder">{price}</span>
        <button
          className="btn btn-primary shop-item-button"
          type="button"
          onClick={() => addToCart(title, price, image)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const CartItem = ({ title, price, image, quantity, removeFromCart, handleChange }) => {
  return (
    <div className="cart-row">
      <div className="cart-item cart-column">
        <img className="cart-item-image" src={image} alt={title} width="100" height="100" />
        <span className="cart-item-title">{title}</span>
      </div>
      <span className="cart-price cart-column">{price}</span>
      <div className="cart-quantity cart-column">
        <input
          className="cart-quantity-input"
          type="number"
          value={quantity} // Dynamically bind to quantity
          onChange={(e) => handleChange(title, e.target.value)}
        />
        <button className="btn btn-danger" type="button" onClick={() => removeFromCart(title)}>
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default function Ecommerce() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addToCart = (title, price, image) => {
    const existingItemIndex = cartItems.findIndex(item => item.title === title);
  
    if (existingItemIndex !== -1) {
      alert('Item is already in the cart.');
    } else {
      const newItem = { title, price, image, quantity: 1 };
      setCartItems(prevCartItems => [...prevCartItems, newItem]);
      alert('Item added to the cart.');
    }
  };

  const removeFromCart = (title) => {
    const updatedCartItems = cartItems.filter((item) => item.title !== title);
    setCartItems(updatedCartItems);
  };

  const handleChange = (title, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.title === title) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price.replace("₹", "")) * item.quantity;
    });
    return total.toFixed(2);
  };

  const handlePurchase = () => {
    // Display confirmation pop-up
    setShowConfirmation(true);
    // Clear cart
    setCartItems([]);
  };

  const handleCloseConfirmation = () => {
    // Close confirmation pop-up
    setShowConfirmation(false);
  };

  return (
    <main className="pt-5 pb-5">
      <section className="container content-section">
        <h2 className="section-header">Mobile</h2>
        <div className="shop-items">
          <ShopItem title="Nokia" price="₹10000" image="./assets/images/m1.jpg" addToCart={addToCart} />
          <ShopItem title="Samsung" price="₹12000" image="./assets/images/m2.jpg" addToCart={addToCart} />
          <ShopItem title="Apple" price="₹45000" image="./assets/images/m3.jpg" addToCart={addToCart} />
          <ShopItem title="Sony" price="₹20000" image="./assets/images/m4.jpg" addToCart={addToCart} />
        </div>
      </section>
      <section className="container content-section">
        <h2 className="section-header">Laptop</h2>
        <div className="shop-items">
          <ShopItem title="HP" price="₹50000" image="./assets/images/dell.jpg" addToCart={addToCart} />
          <ShopItem title="Dell" price="₹75000" image="./assets/images/l2.jpg" addToCart={addToCart} />
          <ShopItem title="Samsung" price="₹60000" image="./assets/images/l3.jpg" addToCart={addToCart} />
          <ShopItem title="Lenova" price="₹65000" image="./assets/images/l4.jpg" addToCart={addToCart} />
        </div>
      </section>
      <section className="container content-section">
        <h2 className="section-header">CART</h2>
        <div className="cart-row">
          <span className="cart-item cart-header cart-column">ITEM</span>
          <span className="cart-price cart-header cart-column">PRICE</span>
          <span className="cart-quantity cart-header cart-column">QUANTITY</span>
        </div>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              title={item.title}
              price={item.price}
              image={item.image}
              quantity={item.quantity} // Pass quantity as prop
              removeFromCart={removeFromCart}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div className="cart-total">
          <strong className="cart-total-title">Total</strong>
          <span className="cart-total-price">₹ {calculateTotal()}</span>
        </div>
        {cartItems.length > 0 && (
          <button id="purchase" className="btn btn-primary btn-purchase" type="button" onClick={handlePurchase}>
            PURCHASE
          </button>
        )}
        {showConfirmation && (
          <div className="confirmation-popup">
            <p>Order placed successfully!</p>
            <button className="btn btn-primary" onClick={handleCloseConfirmation}>OK</button>
          </div>
        )}
      </section>
    </main>
  );
}
