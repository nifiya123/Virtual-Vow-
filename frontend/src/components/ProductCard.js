"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "./ProductCard.css"

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Create a simplified product object with required fields
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images || [product.image || "/placeholder.svg"],
      category: product.category,
    }

    console.log("Adding product to cart:", productToAdd)
    addToCart(productToAdd, 1)

    // Show a confirmation message
    alert(`${product.name} added to cart!`)
  }

  // Ensure product has all required properties
  if (!product || !product._id) {
    return null
  }

  // Handle both image formats (single image or images array)
  const productImage = product.images && product.images[0] ? product.images[0] : product.image || "/placeholder.svg"

  return (
    <div className={`product-card ${viewMode}`}>
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={productImage || "/placeholder.svg"} alt={product.name} />
        </Link>
        <div className="product-actions">
          <button className="action-button cart" onClick={handleAddToCart} aria-label="Add to cart">
            <i className="fas fa-shopping-cart"></i>
            <span className="tooltip">Add to Cart</span>
          </button>
          <button className="action-button wishlist" aria-label="Add to wishlist">
            <i className="fas fa-heart"></i>
            <span className="tooltip">Add to Wishlist</span>
          </button>
          <button className="action-button quick-view" aria-label="Quick view">
            <i className="fas fa-eye"></i>
            <span className="tooltip">Quick View</span>
          </button>
          {product.virtualTryOn && (
            <Link to={`/virtual-try-on/${product._id}`} className="action-button try-on" aria-label="Virtual try-on">
              <i className="fas fa-camera"></i>
              <span className="tooltip">Virtual Try-On</span>
            </Link>
          )}
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <div className="product-price">
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <span className="current-price">${product.price.toFixed(2)}</span>
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        {viewMode === "list" && (
          <div className="product-description">
            <p>{product.shortDescription || product.description.substring(0, 100) + "..."}</p>
            <div className="list-view-actions">
              <button className="primary-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to={`/product/${product._id}`} className="view-details-button">
                View Details
              </Link>
            </div>
          </div>
        )}

        {product.featured && <div className="featured-badge">Featured</div>}
        {(product.countInStock <= 0 || product.inventory <= 0) && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
    </div>
  )
}

export default ProductCard

