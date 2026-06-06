
// fs = File System (module to let node read, write, delete, rename files)

const fs = require ("fs");
const Database = require("better-sqlite3");

const db = new Database('app.db');

const sql = fs.readFileSync("schema.sql", "utf8");



db.exec(sql);
console.log("Database Initialized");