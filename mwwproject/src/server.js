const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const app = express();
const server = require("http").createServer(app);

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "chart",
  port: 3307,
});

// Middleware
app.use(cors());
app.use(express.json()); // JSON parsing

// Start the server
server.listen(8080, () => {
  console.log("server is running on 8080");
});
