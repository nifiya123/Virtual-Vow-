"use client"

import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Pages.css"

const UserHome = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="user-home">
      <div className="welcome-section">
        <h1>Welcome back, {user?.name || "Valued Customer"}!</h1>
        <p>Discover our latest jewelry collections and exclusive offers</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="btn-small">View All</button>
          </div>
          <div className="card-content">
            <div className="order-item">
              <div className="order-info">
                <p className="order-id">Order #VV1234</p>
                <p className="order-date">June 15, 2023</p>
              </div>
              <div className="order-status">
                <span className="status-badge delivered">Delivered</span>
              </div>
            </div>
            <div className="order-item">
              <div className="order-info">
                <p className="order-id">Order #VV1235</p>
                <p className="order-date">July 2, 2023</p>
              </div>
              <div className="order-status">
                <span className="status-badge processing">Processing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Wishlist</h3>
            <button className="btn-small">View All</button>
          </div>
          <div className="card-content">
            <div className="wishlist-grid">
              <div className="wishlist-item">
                <img src="/placeholder.svg?height=80&width=80" alt="Diamond Ring" />
                <p>Diamond Engagement Ring</p>
              </div>
              <div className="wishlist-item">
                <img src="/placeholder.svg?height=80&width=80" alt="Gold Necklace" />
                <p>18K Gold Necklace</p>
              </div>
              <div className="wishlist-item">
                <img src="/placeholder.svg?height=80&width=80" alt="Pearl Earrings" />
                <p>Pearl Drop Earrings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recommended For You</h3>
          </div>
          <div className="card-content">
            <div className="product-recommendations">
              <div className="product-card">
                <img src="/placeholder.svg?height=120&width=120" alt="Sapphire Ring" />
                <h4>Sapphire Halo Ring</h4>
                <p className="price">$1,299</p>
                <button className="btn-small">View Details</button>
              </div>
              <div className="product-card">
                <img src="/placeholder.svg?height=120&width=120" alt="Diamond Bracelet" />
                <h4>Tennis Bracelet</h4>
                <p className="price">$2,499</p>
                <button className="btn-small">View Details</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Virtual Try-On</h3>
          </div>
          <div className="card-content try-on-card">
            <p>See how our jewelry looks on you before purchasing!</p>
            <button className="btn btn-primary">Try On Jewelry</button>
            <div className="try-on-examples">
              <img src="/placeholder.svg?height=60&width=60" alt="Ring Try-On" />
              <img src="/placeholder.svg?height=60&width=60" alt="Necklace Try-On" />
              <img src="/placeholder.svg?height=60&width=60" alt="Earring Try-On" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome

