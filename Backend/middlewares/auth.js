const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HandledError, catchAsync } = require("../utils/errorHandling");

const checkAuthenticationMiddleware = catchAsync(async (req, res, next) => {
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

module.exports = { checkAuthenticationMiddleware };
