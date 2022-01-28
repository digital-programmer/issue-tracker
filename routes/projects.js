const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const issuesController = require("../controllers/issuesController");

router.get("/create", projectsController.index);
router.post("/create-project", projectsController.createProject);
router.get("/:id", projectsController.showProjectDetails);

// for issues
router.get("/:id/create-issue", issuesController.index);

module.exports = router;
