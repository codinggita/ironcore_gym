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

let db, create;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        create = db.collection("create");

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

// POST request to store all data in a single object
app.post('/create-account', async (req, res) => {
    try {
        const { name, password, confirmPassword } = req.body;

        // Basic validation
        if (!name || !password || !confirmPassword) {
            return res.status(400).send("All fields (name, password, confirm password) are required");
        }
        if (password !== confirmPassword) {
            return res.status(400).send("Password and confirm password do not match");
        }

        // Create a single object to store all data
        const accountData = { name, password, confirmPassword };
        const result = await create.insertOne(accountData);

        res.status(201).send(`Account created with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error creating account: " + err.message);
    }
});