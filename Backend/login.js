const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");

const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb+srv://ridhampatelcg:1234@cluster0.r1kfd.mongodb.net/";
const dbName = "Ironcore_gym";

// Middleware
app.use(cors());
app.use(express.json());

let db, login;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        login = db.collection("login");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// POST request to store both identifier and password in one object
app.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).send("Both identifier and password are required");
        }

        // Create a single object to store in MongoDB
        const user = {
            identifier, // Phone number, email, or username
            password    // User password
        };

        // Save to MongoDB
        const result = await login.insertOne(user);
        res.status(201).send(`User created with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding user: " + err.message);
    }
});