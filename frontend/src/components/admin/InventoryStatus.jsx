import "./Admin.css"

const InventoryStatus = () => {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Inventory Status</h3>
      </div>
      <div className="admin-card-content">
        <div className="inventory-summary">
          <div className="inventory-item">
            <div className="inventory-icon in-stock">✓</div>
            <div className="inventory-details">
              <h4>In Stock</h4>
              <p>142 products</p>
            </div>
          </div>
          <div className="inventory-item">
            <div className="inventory-icon low-stock">!</div>
            <div className="inventory-details">
              <h4>Low Stock</h4>
              <p>23 products</p>
            </div>
          </div>
          <div className="inventory-item">
            <div className="inventory-icon out-of-stock">✕</div>
            <div className="inventory-details">
              <h4>Out of Stock</h4>
              <p>8 products</p>
            </div>
          </div>
        </div>
        <div className="inventory-action">
          <button className="inventory-btn">Manage Inventory</button>
        </div>
      </div>
    </div>
  )
}

export default InventoryStatus

