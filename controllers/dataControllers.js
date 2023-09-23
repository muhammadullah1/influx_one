// controllers/dataController.js
const dataService = require('../services/dataService');

// Define your controller functions here
const createData = async (req, res) => {
  try {
    const data = req.body; // Get data from the request
    const result = await dataService.createData(data); // Call the service function
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createData,
};
