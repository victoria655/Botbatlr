// SortBar.js
import React from 'react';

function SortBar({ onSortChange }) {
  return (
    <div className="sort-bar">
      <label>Sort by: </label>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
}

export default SortBar;
