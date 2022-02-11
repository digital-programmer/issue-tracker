const Project = require("../models/project");
const Issue = require("../models/issue");

// create a project page
module.exports.index = function (req, res) {
    return res.render("create_project", {
        title: "Issue Tracker | Create Project"
    });
};


// create a project on form submission
module.exports.createProject = async function (req, res) {
    const project = await Project.findOne({ name: req.body.name });
    // if project not present, create a new project
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

// show all details of a project on click
module.exports.showProjectDetails = async function (req, res) {
    const project = await Project.findById({ _id: req.params.id });
    let issues;
    let sort_by = req.body.sort_by || '0';
    // sort projects by latest or oldest
    if (sort_by == '0') {
        issues = await Issue.find({ 'project': project._id }).sort('-createdAt');
    } else {
        issues = await Issue.find({ 'project': project._id });
    }
    return res.render('project_detail', {
        title: 'Issue Tracker | Project Details',
        project,
        issues,
        sort_by
    });
}

// set the status of project as closed and make its issues as done
module.exports.closeProject = async function (req, res) {
    const project = await Project.findById({ _id: req.params.id }).populate({ path: 'issues' });
    if (project) {
        project.status = 'closed';
        for (issue of project.issues) {
            issue.status = 'closed';
            issue.save();
        }
        project.save();
    }
    req.flash('success', "Project closed");
    return res.redirect("/");
}