import React from 'react';

function SortBar() {
  return (
    <div className="sort-bar">
      <label>Sort by:</label>
      <select>
        <option>New</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortBar;
