const asyncHandler = require("../utils/asyncHandler");

const {
    registerUser, loginUser
} = require("../services/authService");

const sendTokenResponse = require("../utils/sendTokenResponse");

exports.register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);

    sendTokenResponse(
        user,
        201,
        res,
        "User registered successfully."
    );

});

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await loginUser({ email, password });

    sendTokenResponse(
        user,
        200,
        res,
        "User logged in successfully."
    );

});

exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});