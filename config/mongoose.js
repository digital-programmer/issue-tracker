// configure database connection
const mongoose = require("mongoose");
const db_url = process.env.DB_URL || `mongodb://localhost/issue_tracker_dev`;
mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error conecting to MongoDB"));
db.once("open", () => {
    console.log("Connected to database :: MongoDB");
})

module.exports = db;