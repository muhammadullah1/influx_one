const dataService = require('../services/dataService');

const createData = async (req, res) => {
  try {
    const data = req.body;
    const result = await dataService.createData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getData = async (req, res) => {
  try {
    const data = await dataService.getData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createData,
  getData,
};
