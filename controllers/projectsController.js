const Project = require("../models/project");


module.exports.create = function (req, res) {
    return res.render("create_project", {
        title: "Issue Tracker | Create Project"
    });
};

