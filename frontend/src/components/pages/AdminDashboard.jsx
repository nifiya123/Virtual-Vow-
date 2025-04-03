import { Link } from "react-router-dom"
import AdminSidebar from "../admin/AdminSidebar"
import RecentOrders from "../admin/RecentOrders"
import SalesChart from "../admin/SalesChart"
import TopProducts from "../admin/TopProducts"
import InventoryStatus from "../admin/InventoryStatus"
import "../pages/Pages.css"

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Dashboard</h1>
            <p className="admin-subtitle">Welcome to your jewelry store admin panel</p>
          </div>
          <div>
            <Link to="/admin/products/new" className="add-product-btn">
              <span className="plus-icon">+</span>
              Add Product
            </Link>
          </div>
        </div>

        <div className="admin-grid-2">
          <SalesChart />
          <TopProducts />
        </div>

        <div className="admin-grid-3">
          <InventoryStatus />
          <div className="orders-container">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

