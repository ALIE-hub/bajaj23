import React, { useState } from 'react';

function InputForm({ onSubmit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const json = JSON.parse(input);

      // Ensure the JSON structure is valid
      if (json && Array.isArray(json.data)) {
        onSubmit(json); // Pass the JSON data to the parent component
        setError('');
      } else {
        setError('Invalid JSON format: "data" should be an array');
      }
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON"
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default InputForm;
