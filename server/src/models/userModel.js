const pool = require("../config/db");

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const query = `
    INSERT INTO users
    (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email, role, created_at;
  `;

  const values = [
    firstName,
    lastName,
    email,
    password,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return rows[0];
};

const findUserById = async (id) => {
  const query = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      is_verified,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
