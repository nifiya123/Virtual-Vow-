"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import "./Cart.css"

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext)

  console.log("Current cart:", cart)

  // Calculate subtotal
  const subtotal = getCartTotal()

  // Calculate tax (assuming 7%)
  const tax = subtotal * 0.07

  // Calculate shipping (free over $100)
  const shipping = subtotal > 100 ? 0 : 10

  // Calculate total
  const total = subtotal + tax + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <i className="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any jewelry to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="shopping-cart">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <div className="cart-header-product">Product</div>
            <div className="cart-header-price">Price</div>
            <div className="cart-header-quantity">Quantity</div>
            <div className="cart-header-total">Total</div>
            <div className="cart-header-action"></div>
          </div>

          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-product">
                <div className="cart-product-image">
                  <img
                    src={
                      item.image ||
                      item.images?.[0] ||
                      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.name}
                  />
                </div>
                <div className="cart-product-info">
                  <h3 className="cart-product-name">{item.name}</h3>
                  <p className="cart-product-category">{item.category}</p>
                  {item.selectedVariant && <p className="cart-product-variant">{item.selectedVariant}</p>}
                </div>
              </div>

              <div className="cart-price">${item.price.toFixed(2)}</div>

              <div className="cart-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="cart-total">${(item.price * item.quantity).toFixed(2)}</div>

              <div className="cart-action">
                <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/shop" className="btn btn-outline">
              Continue Shopping
            </Link>
            <button className="btn btn-secondary" onClick={() => clearCart()}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>

          <div className="payment-methods">
            <p>We accept:</p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart

