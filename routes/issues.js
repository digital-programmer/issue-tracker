const express = require("express");
const router = express.Router();
const issuesController = require("../controllers/issuesController");

router.get('/clear-filter', issuesController.clearFilter)
router.get('/delete-issue/:id', issuesController.destroy);
router.get('/resolve-issue/:id', issuesController.resolveIssue);
router.post('/filter-issue', issuesController.filterIssue);
module.exports = router;