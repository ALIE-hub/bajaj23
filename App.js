import React, { useState } from 'react';
import InputForm from './InputForm';
import Dropdown from './Dropdown';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [options] = useState(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);

  // Handles form submission
  const handleFormSubmit = async (jsonData) => {
    console.log('Submitting JSON Data:', jsonData);

    try {
      // Post data to backend
      const res = await axios.post('http://localhost:3000/bfhl', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response Data:', res.data); // Log the response data
      setData(res.data); // Update state with response data
    } catch (error) {
      console.error('Error in API call:', error); // Log any errors
    }
  };

  // Handles dropdown selection changes
  const handleDropdownChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);

    if (data) {
      filterResponse(data, selected);
    }
  };

  // Filters the response data based on selected dropdown options
  const filterResponse = (data, selected) => {
    const filteredData = {};

    if (selected.includes('Alphabets')) {
      filteredData.alphabets = data.alphabets;
    }
    if (selected.includes('Numbers')) {
      filteredData.numbers = data.numbers;
    }
    if (selected.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = data.highest_lowercase_alphabet;
    }

    console.log('Filtered Data:', filteredData); // Log filtered data
    setResponse(filteredData); // Update state with filtered data
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <InputForm onSubmit={handleFormSubmit} />
      {data && (
        <Dropdown
          options={options}
          selectedOptions={selectedOptions}
          onChange={handleDropdownChange}
        />
      )}
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
