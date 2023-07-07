const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HandledError, catchAsync } = require("../utils/errorHandling");

const getAndValidateToken = async (req) => {
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
    throw new HandledError("you are not logged in, please log in first", 401);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new HandledError(
      "the user belonged to this token no longer exists",
      401
    );
  }

  return user;
};

const checkAuthenticationMiddleware = catchAsync(async (req, res, next) => {
  const user = await getAndValidateToken(req);

  req.user = user;

  next();
});

module.exports = { checkAuthenticationMiddleware, getAndValidateToken };
