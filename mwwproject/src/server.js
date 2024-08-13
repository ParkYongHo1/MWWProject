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
app.post("/api/insert", async (req, res) => {
  try {
    const currentTime = new Date(); // Get the current timestamp
    let query = "";
    let params = [];

    if (req.body.modifyCheck == "NOT ADDRESS") {
      query = `INSERT INTO chart (abnormal_speech, incorrect_address_changes, correct_address_changes, timestamp) VALUES (?, ?, ?, ?)`;
      params = [1, 0, 0, currentTime];
    } else if (req.body.modifyCheck == "NO MODIFY") {
      query = `INSERT INTO chart (abnormal_speech, incorrect_address_changes, correct_address_changes, timestamp) VALUES (?, ?, ?, ?)`;
      params = [0, 1, 0, currentTime];
    } else {
      console.log("init");
      query = `INSERT INTO chart (abnormal_speech, incorrect_address_changes, correct_address_changes, timestamp) VALUES (?, ?, ?, ?)`;
      params = [0, 0, 1, currentTime];
    }

    await pool.query(query, params);
    res.json(req.body.modifyCheck);
  } catch (err) {
    console.error("데이터 삽입 실패:", err);
    res.status(500).send("서버 오류");
  }
});

// /api/user endpoint
app.get("/api/user", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM chart");
    console.log(results);
    res.json(results);
  } catch (err) {
    console.error("데이터 조회 실패:", err);
    res.status(500).send("서버 오류");
  }
});

app.post("/auth/kakaologin", (req, res) => {
  const nickname = req.body.nickname; // req.body에서 nickname 추출
  console.log("Received nickname:", nickname);
  res.send({ received: true, nickname: nickname });
});

// Start the server
server.listen(8080, () => {
  console.log("server is running on 8080");
});
