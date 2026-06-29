const jwt = require("jsonwebtoken");

const { findUserById } = require("../models/userModel");

const AppError = require("../utils/AppError");

const asyncHandler = require("../utils/asyncHandler");

exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
    throw new AppError(
        "Not authorized.",
        401
    );}

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await findUserById(decoded.id);

    if (!currentUser) {
        throw new AppError("The user no longer exist.", 401);
    }

    req.user = currentUser;
    next();

});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action.",
          403
        )
      );
    }

    next();
  };
};