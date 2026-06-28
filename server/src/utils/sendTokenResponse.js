const generateToken = require("./generateToken");

const sendTokenResponse = (
    user,
    statusCode,
    res,
    message
) => {

    const token = generateToken(user.id);

    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res
        .status(statusCode)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message,
            user
        });

};

module.exports = sendTokenResponse;