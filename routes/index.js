const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.post("/search-project", homeController.home);
router.use("/project", require('./projects'));
router.use("/issue", require('./issues'));
module.exports = router;