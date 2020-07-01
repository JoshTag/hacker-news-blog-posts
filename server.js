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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server runnning on port ${PORT}`))
