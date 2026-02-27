import express from "express";
const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello world",
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
