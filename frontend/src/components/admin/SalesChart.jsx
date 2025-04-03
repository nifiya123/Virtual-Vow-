import "./Admin.css"

const SalesChart = () => {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Sales Overview</h3>
        <select className="time-select">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="admin-card-content">
        <div className="chart-container">
          {/* This would be replaced with an actual chart library in a real implementation */}
          <div className="placeholder-chart">
            <div className="chart-bar" style={{ height: "60%" }}></div>
            <div className="chart-bar" style={{ height: "80%" }}></div>
            <div className="chart-bar" style={{ height: "40%" }}></div>
            <div className="chart-bar" style={{ height: "70%" }}></div>
            <div className="chart-bar" style={{ height: "90%" }}></div>
            <div className="chart-bar" style={{ height: "50%" }}></div>
            <div className="chart-bar" style={{ height: "75%" }}></div>
          </div>
          <div className="chart-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        <div className="sales-summary">
          <div className="summary-item">
            <p className="summary-label">Total Sales</p>
            <p className="summary-value">$12,845</p>
            <p className="summary-change positive">+12.5%</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Orders</p>
            <p className="summary-value">248</p>
            <p className="summary-change positive">+8.3%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesChart

