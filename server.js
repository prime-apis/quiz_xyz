const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/quiz", (req, res) => {
  const category = req.query.category;
  if (!category) return res.status(400).json({ error: "Category required" });

  const filePath = path.join(__dirname, "data", `${category}_quiz.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const quizData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const randomQuiz = quizData[Math.floor(Math.random() * quizData.length)];
    res.json(randomQuiz);
  } catch (err) {
    res.status(500).json({ error: "Failed to read quiz data" });
  }
});

app.get("/", (req, res) => {
  res.send("Quiz API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
