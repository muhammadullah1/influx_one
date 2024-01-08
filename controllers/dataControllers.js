const {
  checkOrganizationAndBucket,
  saveData,
  getData,
} = require("../models/dataModels")
const {
  influxDBCon: {url, token, org, bucket},
} = require("../config/forInfluxDb")

const createData = async (req, res) => {
  try {
    await checkOrganizationAndBucket(org, bucket)
    const {body: data} = req
    const result = await saveData(data)
    if (result) {
      res.status(201).json({
        success: true,
        message: "Data written successfully",
      })
    }
  } catch (error) {
    console.error("Error creating data:", error)
    res.status(500).json({success: false, error: "Internal server error"})
  }
}

const fetchData = async (req, res) => {
  try {
    await checkOrganizationAndBucket(org, bucket)
    const data = await getData()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error retrieving data:", error)
    res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
  createData,
  fetchData,
}
