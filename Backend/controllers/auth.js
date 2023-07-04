const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchAsync, HandledError } = require("../utils/errorHandling");

const sendAuthResponse = (res, { user, statusCode, message }) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: Number(process.env.JWT_EXPIRES_IN_SECONDS) * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  user.password = undefined;
  res.status(statusCode).json({
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

const checkAuthentication = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("hamala baba");
    return next(
      new HandledError("you are not logged in, please log in first", 401)
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return next(
      new HandledError("the user belonged to this token no longer exists", 401)
    );
  }

  req.user = user;

  next();
});

module.exports = {
  signUp,
  login,
  logout,
  checkAuthentication,
};
