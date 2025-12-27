const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",      
    password: "",     
    database: "bitotri"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error:", err);
    } else {
        console.log("Connected to MySQL (XAMPP)");
    }
});


// Test route
app.get("/", (req, res) => {
    res.send("Bi To Tri Backend is running!");
});


app.get("/api/supplements", (req, res) => {
    db.query("SELECT * FROM supplements", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.get("/api/clothes", (req, res) => {
    db.query("SELECT * FROM clothes", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.get("/api/coaches", (req, res) => {
    db.query("SELECT * FROM coaches", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.query(query, [name, email, password], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User registered!" });
    });
});


app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0)
            return res.status(400).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful", user: results[0] });
    });
});


app.post("/api/cart", (req, res) => {
    const { user_id, product_id, qty } = req.body;

    const query = `INSERT INTO cart (user_id, product_id, qty) VALUES (?, ?, ?)`;

    db.query(query, [user_id, product_id, qty], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Added to cart!" });
    });
});


app.get("/api/cart/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query("SELECT * FROM cart WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
