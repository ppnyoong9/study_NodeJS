import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; // express module 가져옴
import cookieParser from "cookie-parser";
import User from "./model/User.js";
import auth from "./middleware/auth.js";

// 환경 변수 로드
dotenv.config();

const app = express(); // 새로운 express 앱을 만듬 Creates an Express application
const port = process.env.PORT || 5000; // 포트

app.use(express.urlencoded({ extended: true })); // application/x-www-form-unlencoded
app.use(express.json()); // application/json
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 노드문 오왕");
});

/********************** 회원가입 *********************/
app.post("/api/users/register", async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ success: true });
    // status 200 은 성공
  } catch (error) {
    res.json({ success: false, error });
  }
});

/********************** 로그인 **********************/
app.post("/api/users/login", async (req, res) => {
  try {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // 비밀번호 까지 맞다면 토큰을 생성하기
    const updateUser = await user.generateToken();
    res
      .cookie("x_auth", updateUser.token)
      // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 (여기선 쿠키에 저장할거임)
      .status(200)
      .json({ loginSuccess: true, userId: updateUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

/********************** 인증 및 권한 **********************/
// (role) 0:일반 user, 1:admin,  2: 특정부서 admin
app.get("/api/users/auth", auth, async (req, res) => {
  // 미들웨어 auth를 넣어줌 // auth를 GET 요청에 넣어주면, 요청이 해당 경로로 들어올 때마다 인증 처리 로직을 먼저 실행
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

/********************** 로그아웃 **********************/
app.get("/api/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/********************** Axios test를 위한 hello **********************/
app.get("/api/hello", (req, res) => {
  res.send("안녕하세용!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
