// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use your API routes
app.use('/api', dataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
