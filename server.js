const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path");

app.use(express.json())
app.use(cors())

// Routes
const stories = require("./routes/stories")

app.use("/api/stories", stories)

app.use(express.static('public'))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server runnning on port ${PORT}`))
