const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.post("/search-project", homeController.home);
// route for all project related tasks
router.use("/project", require('./projects'));
// routes for all issue related tasks
router.use("/issue", require('./issues'));
module.exports = router;