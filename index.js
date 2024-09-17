require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const axiosInstance = require('./supabaseInstance'); 
const app = express();
const snacksRoutes = require("./api/routes/snacksRoutes"); 

// Define PORT or default to 4000
const PORT = process.env.PORT || 4000;

// Middleware for API Key Authentication
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['SUPABASE_KEY']; // Ensure this matches the header sent from Postman
  if (apiKey && apiKey === process.env.SUPABASE_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

// Middleware and other configurations
app.use(express.json());
app.use(cors()); 
app.use(apiKeyMiddleware); 

// app.get('/snacks', (req, res) => {
//   res.send('This is a secure route');
// });

// Use the snacks routes
app.use('/snacks', snacksRoutes);

// Route to fetch all snacks
app.get('/', async (req, res) => {
  try {
    const response = await axiosInstance.get('/snacks?order=id.asc');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
});

// Route to create a new snack
app.post('/snacks', async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || typeof price !== 'number' || !category || inStock === undefined) {
    return res.status(400).json({ message: 'All fields are required and price must be a number' });
  }
  try {
    const response = await axiosInstance.post('/snacks', { name, description, price, category, inStock });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating snack:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to fetch a snack by ID
app.get('/snacks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await axiosInstance.get(`/snacks?id=eq.${id}`);
    if (response.data.length === 0) {
      return res.status(404).json({ message: 'Snack not found' });
    }
    res.json(response.data[0]);
  } catch (error) {
    console.error('Error fetching snack:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update a snack by ID
app.put('/snacks/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || category == null || inStock == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const response = await axiosInstance.patch(`/snacks?id=eq.${id}`, {
      name,
      description,
      price,
      category,
      inStock
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating snack:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'An error occurred while updating the snack.'
    });
  }
});

// Route to delete a snack by ID
app.delete('/snacks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await axiosInstance.delete(`/snacks?id=eq.${id}`);
    res.json({ message: 'Snack deleted successfully' });
  } catch (error) {
    console.error('Error deleting snack:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'An error occurred while deleting the snack.'
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
