import React from 'react';

function FilterBar() {
  return (
    <div className="filter-bar">
      <select>
        <option>Product type</option>
        <option>Type 1</option>
        <option>Type 2</option>
      </select>
      <select>
        <option>Color</option>
        <option>Red</option>
        <option>Blue</option>
      </select>
      <select>
        <option>Age</option>
        <option>0-5</option>
        <option>5-10</option>
      </select>
    </div>
  );
}

export default FilterBar;
