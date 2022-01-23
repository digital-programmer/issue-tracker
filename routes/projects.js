const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

router.get("/create", projectsController.index);
router.post("/create-project", projectsController.createProject);

module.exports = router;
