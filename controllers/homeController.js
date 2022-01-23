const Project = require("../models/project");

module.exports.home = async function (req, res) {
    const projects = await Project.find({});
    return res.render("home", {
        title: "Issue Tracker | Home",
        projects: projects
    });
};
