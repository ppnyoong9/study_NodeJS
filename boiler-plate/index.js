import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; // express module 가져옴
import { User } from "./model/User.js";

// 환경 변수 로드
dotenv.config();

const app = express(); // 새로운 express 앱을 만듬 Creates an Express application
const port = process.env.PORT || 5000; // 포트

// application/x-www-form-unlencoded
app.use(express.urlencoded({ extended: true }));
// application/json
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 노드문 오왕");
});

app.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  user
    .save()
    .then(
      () => res.status(200).json({ sucess: true })
      // status 200 은 성공
    )
    .catch((err) => res.json({ sucess: false, err }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
