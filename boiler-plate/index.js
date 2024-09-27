import mongoose from "mongoose";
import express from "express";  // express module 가져옴

const app = express(); // 새로운 express 앱을 만듬 Creates an Express application
const port = 5000; // 포트

mongoose
  .connect(
    "mongodb+srv://ppnyoong:abcd1234@boilerplate.oqtyg.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate" )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세용");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
