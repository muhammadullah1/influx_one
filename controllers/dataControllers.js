const dataModel = require('../models/dataModels');
const {
  influxDBCon: {url, token, org, bucket},
} = require('../config/forInfluxDb');

const createData = async (req, res) => {
  try {
    await dataModel.checkOrganizationAndBucket(org, bucket);
    const data = req.body;
   const result = await dataModel.saveData(data); 
   if (result) {
    res.status(201).json({
      success: true,
      message: 'Data written successfully',
    });
  } else {
    console.error('Error creating data: Data not written');
    res.status(500).json({ success: false, error: 'Data not written' });
  }
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getData = async (req, res) => {
  try {
    await dataModel.checkOrganizationAndBucket(org, bucket);
    const data = await dataModel.getData();
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
