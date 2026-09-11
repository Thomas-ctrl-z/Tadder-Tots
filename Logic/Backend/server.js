const express = require("express");
const session = require("express-session");

const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

const fs = require ("fs");
const Database = require("better-sqlite3");
const { error } = require("console");

const db = new Database('app.db');

const sql = fs.readFileSync("schema.sql", "utf8");


db.exec(sql);
console.log("Database Initialized");

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(session ({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));


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

        req.session.userId = user.id;

        console.log("User logged in:", user.username);
        console.log("Session ID:", req.sessionID);

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


//==================================
//===== TEST SESSION DATA ROUTE ======
//==================================

app.get("/test-session", (req, res) => {
    console.log("session: ", req.session);

    if (!req.session.userId) {
        return res.status(401).json({
            error:"Not Logged in"
        });
    }
    res.json({
        message: "You are logged in",
        userId: req.session.userId
    });
});



//==================================
//===== ACCOUNTS DATA ROUTE ========
//==================================


app.get("/account", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    const user = db.prepare(`
        SELECT id, username, email, created_at
        FROM users
        WHERE id = ?
        `).get(req.session.userId);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    } 

    res.json({
        user: user
    });
});




//==================================
//===== SERVER STARTUP ============
//==================================
app.listen(3000, () => {
    console.log("server running on port 3000");

});


