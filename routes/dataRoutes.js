// routes/dataRoutes.js
const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

// Define your API routes here
router.post('/data', dataController.createData);

module.exports = router;
