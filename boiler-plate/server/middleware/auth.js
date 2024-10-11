import User from "../model/User.js";

let auth = async (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다
  try {
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    throw error;
  }

  // 유저가 있으면 인증 OK

  // 유저가 없으면 인증 NO
};

export default auth;
