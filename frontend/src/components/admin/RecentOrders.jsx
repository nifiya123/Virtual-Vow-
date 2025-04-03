import "./Admin.css"

const RecentOrders = () => {
  // Sample data for recent orders
  const recentOrders = [
    { id: "ORD-001", customer: "Emma Johnson", date: "2023-05-15", total: "$249.99", status: "Delivered" },
    { id: "ORD-002", customer: "Michael Smith", date: "2023-05-14", total: "$189.50", status: "Processing" },
    { id: "ORD-003", customer: "Sophia Williams", date: "2023-05-13", total: "$345.75", status: "Shipped" },
    { id: "ORD-004", customer: "James Brown", date: "2023-05-12", total: "$129.99", status: "Delivered" },
    { id: "ORD-005", customer: "Olivia Davis", date: "2023-05-11", total: "$275.25", status: "Processing" },
  ]

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Recent Orders</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="admin-card-content">
        <table className="admin-table">
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
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders

