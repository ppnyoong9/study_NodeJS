import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, // 일반 user = 0
  },
  image: String,
  token: String,
  tokenExp: Number,
});

/************************ 비밀번호 암호화 미들웨어 ************************/
const saltRounds = 10; // salt 라운드 수 정의

userSchema.pre("save", async function (next) {
  var user = this;
  // 비밀번호가 변경된 경우에만 실행
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(saltRounds); //salt 생성
      const hash = await bcrypt.hash(user.password, salt); // 비밀번호 암호화
      user.password = hash; // 해시된 비밀번호 저장
    } catch (error) {
      return next(err);
    }
  }
  next(); // 모든 작업이 완료 된 후 next() 호출
});

/************************ 비밀번호 비교 ************************/
// plainPassword "1234" 암호화된 비밀번호 "$2b$10$JuPRCdYCxyIlQkqhzooNSuiM1u8NjIOCY/qhX0Ag4494sItuCjs8C"
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const isMatch = bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

/************************ 토큰 생성 ************************/
userSchema.methods.generateToken = async function () {
  var user = this;
  // jsonwebtoken 을 이용해서 token을 생성하기
  var token = jwt.sign({ id: user._id }, "secretToken");
  // user._id + 'secretToken' = token // 둘의 조합으로 token 생성
  // ->
  // 'secretToken' -> user._id // 나중에 secretTken를 넣으면 user._id를 알 수 있음
  user.token = token;
  try {
    return await user.save();
  } catch (error) {
    throw error;
  }
};
/************************ 토큰 가져오기 ************************/
userSchema.statics.findByToken = async function (token) {
  var user = this;
  try {
    // 토큰을 decode 한다
    const decodedToken = jwt.verify(token, "secretToken");
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인
    const findUser = await user.findOne({
      _id: decodedToken.id,
      token: token,
    });
    return findUser;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
