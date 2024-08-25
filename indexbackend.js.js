const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001' // Allow requests from your frontend port
}));

// POST /bfhl route
app.post('/bfhl', (req, res) => {
  const data = req.body.data;

  console.log('Received Data:', data);  // Log the received data

  // Validate that 'data' is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "'data' must be an array"
    });
  }

  // Validate array elements
  const validElements = data.every(item => typeof item === 'string' || typeof item === 'number');
  if (!validElements) {
    return res.status(400).json({
      is_success: false,
      message: 'All elements in the data array must be strings or numbers'
    });
  }

  // Extract numbers and alphabets
  const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
  const alphabets = data.filter(item => isNaN(item) && item.trim() !== '');

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [Math.max(...lowercaseAlphabets.map(a => a.charCodeAt(0)))] : [];

  // Prepare the response
  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet.map(code => String.fromCharCode(code))
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
