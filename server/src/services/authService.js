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

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }
  delete user.password;

  return user;
}

module.exports = {
  registerUser,
  loginUser,
};