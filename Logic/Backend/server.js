const express = require("express");

const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

const fs = require ("fs");
const Database = require("better-sqlite3");

const db = new Database('app.db');

const sql = fs.readFileSync("schema.sql", "utf8");


db.exec(sql);
console.log("Database Initialized");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.post("/register", async (req, res) => {
    const {username, email, password, confirmPassword } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const insertUser = db.prepare(`
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
        `);

    insertUser.run(username, email, passwordHash);
    
    console.log(users);

    console.log("User registered:", username);

    res.send("User registered");
});

app.listen(3000, () => {
    console.log("server running on port 3000");

});

