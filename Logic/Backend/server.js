const express = require("express");

const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.post("/register", async (req, res) => {
    const {username, email, password, confirmPassword } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(username);
    console.log(email);
    console.log("Hashing route version");
    console.log("Hash passowrd = ", passwordHash);
    console.log(confirmPassword);

    res.send("User registered");
});

app.listen(3000, () => {
    console.log("server running on port 3000");

});