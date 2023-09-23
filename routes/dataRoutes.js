const express = require('express');
const dataController = require('../controllers/dataControllers');

const router = express.Router();

// Define your API routes here
router.post('/data', dataController.createData);
router.get('/data', dataController.getData); 

module.exports = router;
