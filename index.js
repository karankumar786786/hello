import express from "express";
const app = express();
import { config } from "dotenv";
config();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello brother",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
