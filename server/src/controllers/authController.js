const asyncHandler = require("../utils/asyncHandler");

const {
    registerUser
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