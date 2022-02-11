const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

// redirect all request logs to a file
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


// print all production logs in combined form
const logger = {
    morgan: {
        mode: "combined",
        options: { stream: accessLogStream }
    }
}

module.exports = logger;