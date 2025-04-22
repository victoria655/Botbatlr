import React from 'react';


const classes = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

function SidebarFilter({ selectedClass, onClassSelect }) {
  return (
    <div className="sidebar">
      <h3>Filter by Class</h3>
      <ul>
        {classes.map(cls => (
          <li
            key={cls}
            className={selectedClass === cls ? 'active' : ''}
            onClick={() => onClassSelect(cls)}
          >
            {cls}
          </li>
        ))}
        <li
          className={!selectedClass ? 'active' : ''}
          onClick={() => onClassSelect(null)}
        >
          All
        </li>
      </ul>
    </div>
  );
}

export default SidebarFilter;
