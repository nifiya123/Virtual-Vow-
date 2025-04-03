"use client"

import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Pages.css"

const AdminPanel = () => {
  const { user } = useContext(AuthContext)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "rings",
    image: "",
    additionalImages: [],
    brand: "",
    countInStock: 10,
    featured: false,
    material: "",
    dimensions: "",
    weight: "",
    virtualTryOn: false,
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for demonstration
  const recentOrders = [
    { id: "VV1242", customer: "Emma Johnson", date: "2023-07-15", total: "$2,450.00", status: "Delivered" },
    { id: "VV1241", customer: "Michael Chen", date: "2023-07-14", total: "$1,875.00", status: "Processing" },
    { id: "VV1240", customer: "Sophia Rodriguez", date: "2023-07-14", total: "$3,200.00", status: "Shipped" },
    { id: "VV1239", customer: "James Wilson", date: "2023-07-13", total: "$950.00", status: "Processing" },
    { id: "VV1238", customer: "Olivia Brown", date: "2023-07-12", total: "$4,125.00", status: "Delivered" },
  ]

  const topProducts = [
    { name: "Diamond Solitaire Ring", category: "Engagement Rings", sales: 28, revenue: "$84,000" },
    { name: "Pearl Drop Earrings", category: "Earrings", sales: 36, revenue: "$32,400" },
    { name: "Gold Tennis Bracelet", category: "Bracelets", sales: 22, revenue: "$55,000" },
    { name: "Sapphire Pendant", category: "Necklaces", sales: 19, revenue: "$28,500" },
  ]

  const inventoryAlerts = [
    { product: "Diamond Eternity Band", sku: "DEB-001", stock: 2, status: "Low Stock" },
    { product: "Emerald Cut Earrings", sku: "ECE-003", stock: 1, status: "Low Stock" },
    { product: "White Gold Chain", sku: "WGC-010", stock: 0, status: "Out of Stock" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setProductForm({
      ...productForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // In a real application, you would make an API call to your backend
      // For demonstration, we'll simulate an API call
      console.log("Adding product:", productForm)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful response
      setSuccessMessage(`Product "${productForm.name}" added successfully!`)

      // Reset form
      setProductForm({
        name: "",
        description: "",
        price: "",
        category: "rings",
        image: "",
        additionalImages: [],
        brand: "",
        countInStock: 10,
        featured: false,
        material: "",
        dimensions: "",
        weight: "",
        virtualTryOn: false,
      })

      // Close form after successful submission
      setTimeout(() => {
        setShowAddProduct(false)
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error adding product:", error)
      setErrorMessage("Failed to add product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name || "Admin"}</p>
      </div>

      {successMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-value">1,248</p>
            <p className="stat-change positive">+12% from last month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-details">
            <h3>Revenue</h3>
            <p className="stat-value">$285,420</p>
            <p className="stat-change positive">+8% from last month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon customers-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-details">
            <h3>Customers</h3>
            <p className="stat-value">845</p>
            <p className="stat-change positive">+5% from last month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon products-icon">
            <i className="fas fa-gem"></i>
          </div>
          <div className="stat-details">
            <h3>Products</h3>
            <p className="stat-value">124</p>
            <p className="stat-change neutral">+2 new this month</p>
          </div>
        </div>
      </div>

      {showAddProduct ? (
        <div className="admin-card add-product-form">
          <div className="card-header">
            <h3>Add New Product</h3>
            <button className="btn-small" onClick={() => setShowAddProduct(false)}>
              Cancel
            </button>
          </div>
          <div className="card-content">
            <form onSubmit={handleAddProduct}>
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="name">Product Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productForm.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Diamond Solitaire Ring"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description*</label>
                    <textarea
                      id="description"
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Detailed product description..."
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Price ($)*</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="countInStock">Stock*</label>
                      <input
                        type="number"
                        id="countInStock"
                        name="countInStock"
                        value={productForm.countInStock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="category">Category*</label>
                    <select
                      id="category"
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="rings">Rings</option>
                      <option value="necklaces">Necklaces</option>
                      <option value="earrings">Earrings</option>
                      <option value="bracelets">Bracelets</option>
                      <option value="watches">Watches</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="brand">Brand*</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Virtual Vow"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Main Image URL*</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={productForm.image}
                      onChange={handleInputChange}
                      required
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="material">Material</label>
                      <input
                        type="text"
                        id="material"
                        name="material"
                        value={productForm.material}
                        onChange={handleInputChange}
                        placeholder="e.g. Gold, Silver"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="weight">Weight</label>
                      <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={productForm.weight}
                        onChange={handleInputChange}
                        placeholder="e.g. 5g"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-checkboxes">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={productForm.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured">Featured Product (shown on homepage)</label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="virtualTryOn"
                    name="virtualTryOn"
                    checked={productForm.virtualTryOn}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="virtualTryOn">Enable Virtual Try-On</label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddProduct(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <div className="admin-card orders-table">
            <div className="card-header">
              <h3>Recent Orders</h3>
              <button className="btn-small">View All Orders</button>
            </div>
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                      </td>
                      <td>
                        <button className="btn-icon">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card top-products">
            <div className="card-header">
              <h3>Top Selling Jewelry</h3>
              <button className="btn-small">View Report</button>
            </div>
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.sales}</td>
                      <td>{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card inventory-alerts">
            <div className="card-header">
              <h3>Inventory Alerts</h3>
              <button className="btn-small">Manage Inventory</button>
            </div>
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryAlerts.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product}</td>
                      <td>{item.sku}</td>
                      <td>{item.stock}</td>
                      <td>
                        <span className={`status-badge ${item.status === "Out of Stock" ? "danger" : "warning"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-small">Restock</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card quick-actions">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setShowAddProduct(true)}>
                  <i className="fas fa-plus"></i>
                  <span>Add New Product</span>
                </button>
                <button className="action-btn">
                  <i className="fas fa-tag"></i>
                  <span>Create Promotion</span>
                </button>
                <button className="action-btn">
                  <i className="fas fa-truck"></i>
                  <span>Update Shipping</span>
                </button>
                <button className="action-btn">
                  <i className="fas fa-chart-line"></i>
                  <span>Sales Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

