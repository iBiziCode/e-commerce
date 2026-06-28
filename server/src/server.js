require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;


async function startServer() {
  try {
    // Test database connection
    const result = await pool.query("SELECT NOW()");
    console.log(" Connected to PostgreSQL");
    console.log("Database time:", result.rows[0].now);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();