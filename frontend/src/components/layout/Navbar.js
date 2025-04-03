"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Layout.css"

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Virtual Vows
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/shop" className="navbar-link">
              Shop
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/virtual-try-on" className="navbar-link">
              Virtual Try-On
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/cart" className="navbar-link">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              <li className="navbar-item dropdown">
                <button className="navbar-link dropdown-toggle">
                  {user?.name || "Account"} <i className="fas fa-chevron-down"></i>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item">
                    Wishlist
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

