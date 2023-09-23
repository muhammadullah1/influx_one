// services/dataService.js
const dataModel = require('../models/dataModels');

// Define your service functions here
const createData = async (data) => {
  dataModel.saveData(data);
  return { message: 'Data saved successfully' };
};

module.exports = {
  createData,
};
