import React from 'react';

function Dropdown({ options, selectedOptions, onChange }) {
  return (
    <select multiple value={selectedOptions} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
