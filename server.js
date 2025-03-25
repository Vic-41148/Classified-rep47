const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.md");

// Middleware
app.use(cors()); // Allow all origins
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve all files in this folder

// Endpoint to save markdown entry
app.post("/save", (req, res) => {
    const entry = req.body.entry;
    if (!entry) {
        return res.status(400).send("No entry provided.");
    }
    // Append the entry to data.md
    fs.appendFile(DATA_FILE, entry, (err) => {
        if (err) {
            console.error("Error appending to file:", err);
            return res.status(500).send("Failed to save data.");
        }
        res.send("Data saved successfully!");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
