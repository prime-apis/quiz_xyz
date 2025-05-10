const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Quiz API is running!");
});

app.get("/quiz/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const filePath = path.join(__dirname, "data", `${category}_quiz.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
