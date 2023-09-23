const dataModel = require('../models/dataModels');

const createData = async (data) => {
  dataModel.saveData(data);
  return { message: 'Data saved successfully' };
};
const getData = async () => {
  try {
    const data = await dataModel.getData();
    return data;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createData,
  getData,
};
