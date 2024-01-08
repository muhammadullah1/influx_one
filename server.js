const express = require("express")
const bodyParser = require("body-parser")
const dataRoutes = require("./routes/dataRoutes")
const cors = require("cors")
const path = require("path")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())

// Use your API routes
app.use("/api", dataRoutes)

app.use(express.static(path.join(__dirname, "views")))
app.get("/player", async (req, res) => {
  res.sendFile(path.join(__dirname, "views", "player.html"))
})
app.get("/report", async (req, res) => {
  res.sendFile(path.join(__dirname, "views", "report.html"))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
