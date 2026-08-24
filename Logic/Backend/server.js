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


//==================================
//===== SIGNUP FORM DATA ROUTE =====
//==================================
app.post("/register", async (req, res) => {
    const {username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json ({
            error: "Passwords do not match"
        });
    }

    try{
        const passwordHash = await bcrypt.hash(password, 10);

        const insertUser = db.prepare(`
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
            `);

        insertUser.run(username, email, passwordHash);
        
        console.log("user registered:", username);

        res.status(201).json({
            message: "user registered succesfully"
        });


    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Username or email already exists"
            });
        }

        console.error("Registration error:", error);
        res.status(500).json({
            error: "Something went wrong while creating your account"
        });
    }
});



//==================================
//===== LOGIN FORM DATA ROUTE ======
//==================================


app.post("/login", async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = db.prepare(`
            SELECT * FROM users
            WHERE email = ?
        `).get(email);

        if (!user) {
            return res.status(401).json({
                error: "invalid email or password"
            });
        }    
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );
        if (!passwordMatch) {
            return res.status(401).json({
                error: "invalid email or password"
            });
        }

        console.log("User logged in:", user.username);

        res.status(200).json({
            message: "Login succesful"
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Something went wrong while logging in"
        });
    }
});





app.listen(3000, () => {
    console.log("server running on port 3000");

});

