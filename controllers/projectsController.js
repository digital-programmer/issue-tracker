const Project = require("../models/project");


module.exports.index = function (req, res) {
    return res.render("create_project", {
        title: "Issue Tracker | Create Project"
    });
};

module.exports.createProject = async function (req, res) {
    const project = await Project.findOne({ name: req.body.name });
    if (!project) {
        await Project.create({
            name: req.body.name.trim().toLowerCase(),
            description: req.body.description.trim(),
            author: req.body.author.trim()
        });

        req.flash('success', 'Project created successfully');
        return res.redirect("/");
    }

    req.flash('error', 'Project name already exists, Try another');
    return res.redirect("back");
};