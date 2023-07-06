const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchAsync, HandledError } = require("../utils/errorHandling");

const sendAuthResponse = (res, { user, statusCode, message }) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieExpirationTimeInMiliseconds =
    Number(process.env.JWT_EXPIRES_IN_SECONDS) * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: cookieExpirationTimeInMiliseconds,
    secure: true,
    sameSite: "none",
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    data: {
      message,
      user,
      token,
    },
  });
};

const signUp = catchAsync(async (req, res, next) => {
  // const { email, password } = req.body;

  const newUser = await User.create(req.body);

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  sendAuthResponse(res, {
    user: newUser,
    statusCode: 201,
    message: "Create new user successfully",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandledError("Invalid email or password", 400));
  }

  const isCorrectPassword = await user.checkPassword(password);

  if (!isCorrectPassword) {
    return next(new HandledError("Invalid email or password", 400));
  }

  sendAuthResponse(res, {
    user,
    statusCode: 200,
    message: "Login successfully",
  });
});

const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 10 });
  res.status(200).json({
    message: "log out successfully",
  });
};

module.exports = {
  signUp,
  login,
  logout,
};
