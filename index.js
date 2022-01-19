require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const db = require("./config/mongoose");
const loggerConfig = require("./config/logger");

const session = require('express-session');
const expressLayouts = require("express-ejs-layouts");
const logger = require("morgan");
const flash = require('connect-flash');
const customWare = require("./config/middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(logger(loggerConfig.morgan.mode, loggerConfig.morgan.options));
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine and view route
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    cookie: { maxAge: 6000000 },
    secret: 'issue_tracker',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(customWare.setFlash);

// use express router to connect
app.use("/", require("./routes"));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
