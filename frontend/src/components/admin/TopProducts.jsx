import "./Admin.css"

const TopProducts = () => {
  // Sample data for top products
  const topProducts = [
    {
      id: 1,
      name: "Diamond Engagement Ring",
      sales: 42,
      revenue: "$21,000",
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: 2, name: "Gold Necklace", sales: 38, revenue: "$15,200", image: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Pearl Earrings", sales: 35, revenue: "$8,750", image: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Silver Bracelet", sales: 31, revenue: "$6,200", image: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Sapphire Pendant", sales: 28, revenue: "$14,000", image: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Top Selling Products</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="admin-card-content">
        <ul className="top-products-list">
          {topProducts.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="product-sales">{product.sales} sales</p>
              </div>
              <div className="product-revenue">{product.revenue}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TopProducts

