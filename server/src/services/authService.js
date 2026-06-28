const bcrypt = require("bcrypt");
const validator = require("validator");
const AppError = require("../utils/AppError");

const {
  createUser,
  findUserByEmail,
} = require("../models/userModel");

const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required.", 400);
  }

  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email.", 400);
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new AppError("Password must be at least 8 characters.", 400);
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists.", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = {
  registerUser,
};