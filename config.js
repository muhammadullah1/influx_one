require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  // InfluxDB configuration
  influxDB: {
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    org: process.env.INFLUX_ORG,
    bucket: process.env.INFLUX_BUCKET,
  },

  // Other configuration options, if needed
};
