const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

// API endpoint for getting quiz data based on category
app.get("/quiz", (req, res) => {
  const category = req.query.category || "general"; // Default to 'general' if no category is provided
  const quizPath = path.join(__dirname, "quizdata", `${category}.json`);

  // Check if the category file exists
  if (!fs.existsSync(quizPath)) {
    return res.status(404).json({ message: `Category ${category} not found.` });
  }

  // Read the quiz data from the file
  const quizData = JSON.parse(fs.readFileSync(quizPath, "utf-8"));
  res.json(quizData); // Send quiz data back to the client
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
