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