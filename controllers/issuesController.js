const Project = require("../models/project");
const Issue = require("../models/issue");

module.exports.index = function (req, res) {
    return res.render('create_issue', {
        title: "Issue Tracker | Create Issue",
        project_id: req.params.id
    })
}


module.exports.createIssue = async function (req, res) {
    const labelList = ['bug', 'documentation', 'duplicate', 'enhancement', 'invalid', 'compilance', 'observation', 'RFI'];
    try {
        let project = await Project.findById({ _id: req.params.id });
        if (project) {
            const markedLabels = labelList.filter(label => {
                return req.body[label] !== undefined;
            });
            const issue = await Issue.create({
                'title': req.body.name,
                'description': req.body.description,
                'author': req.body.author,
                'project': project._id,
                'labels': markedLabels
            });

            project.issues.push(issue);
            project.save();

            req.flash('success', 'Issue created successfully')
            return res.redirect(`/project/${req.params.id}`);
        }
    } catch (err) {
        console.log("Error", err);
        req.flash('error', 'Could not create issue');
        return res.redirect('back');
    }

}