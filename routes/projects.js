const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

router.get("/create", projectsController.create);

module.exports = router;
