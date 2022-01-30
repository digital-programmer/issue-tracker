const Project = require("../models/project");
const Issue = require("../models/issue");

module.exports.index = function (req, res) {
    return res.render('create_issue', {
        title: "Issue Tracker | Create Issue",
        project_id: req.params.id
    })
}


module.exports.createIssue = function (req, res) {
    console.log(req.body);
}