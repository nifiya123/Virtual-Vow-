import { Link } from "react-router-dom"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  if (!product) return null

  const { _id, name, price, image, category, virtualTryOn } = product

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image || "/placeholder.svg?height=300&width=300"} alt={name} className="product-image" />
        <div className="product-overlay">
          <Link to={`/products/${_id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">{category}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        <div className="product-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
          {virtualTryOn && (
            <Link to={`/virtual-try-on/${_id}`} className="try-on-btn">
              Try On
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

