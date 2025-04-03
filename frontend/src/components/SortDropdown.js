"use client"

import "./SortDropdown.css"

const SortDropdown = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={value} onChange={handleChange}>
        <option value="newest">Newest</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="name-a-z">Name: A to Z</option>
        <option value="name-z-a">Name: Z to A</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortDropdown

