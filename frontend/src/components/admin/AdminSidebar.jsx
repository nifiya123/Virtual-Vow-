import { Link } from "react-router-dom"
import "./Admin.css"

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Virtual Vow</h2>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/admin" className="sidebar-link active">
              <span className="sidebar-icon">📊</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="sidebar-link">
              <span className="sidebar-icon">💍</span>
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="sidebar-link">
              <span className="sidebar-icon">📦</span>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/customers" className="sidebar-link">
              <span className="sidebar-icon">👥</span>
              Customers
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="sidebar-link">
              <span className="sidebar-icon">⚙️</span>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Link to="/" className="view-store-btn">
          View Store
        </Link>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default AdminSidebar

