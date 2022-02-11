const Project = require("../models/project");


// display all projects in home page
module.exports.home = async function (req, res) {
    const projects = await Project.find({}).sort('-createdAt');
    if (!req.body.title || req.body.title === undefined) {
        return res.render("home", {
            title: "Issue Tracker | Home",
            projects: projects,
            input_value: ''
        });
    }

    // if search functionality is used, show only the projects which match the search string
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