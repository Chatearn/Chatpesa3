const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ChatPesa payment server is running"
  });
});

app.listen(PORT, () => {
  console.log(`ChatPesa server running on port ${PORT}`);
});
