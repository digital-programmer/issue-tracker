const Project = require("../models/project");

module.exports.home = async function (req, res) {
    const projects = await Project.find({}).sort('-createdAt');
    if (!req.body.title || req.body.title === undefined) {
        return res.render("home", {
            title: "Issue Tracker | Home",
            projects: projects,
            input_value: ''
        });
    }

    const searchText = req.body.title.trim().toLowerCase();
    const newProjectList = projects.filter(project => {
        let projectName = project.name.toLowerCase();
        return projectName.includes(searchText);
    })

    return res.render("home", {
        title: "Issue Tracker | Home",
        projects: newProjectList,
        input_value: req.body.title
    });

};