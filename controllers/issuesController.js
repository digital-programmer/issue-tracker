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


module.exports.clearFilter = function (req, res) {
    return res.redirect('back');
}

module.exports.destroy = async function (req, res) {
    try {
        let issue = await Issue.findById(req.params.id);
        if (issue) {
            let project_id = issue.project;
            issue.remove();
            let project = await Project.findByIdAndUpdate(project_id, { $pull: { issues: req.params.id } });
            req.flash('success', 'Issue deleted successfully');
            return res.redirect('back');
        } else {
            req.flash('error', 'Cannot delete issue');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        req.flash('error', 'Cannot delete issue');
        return res.redirect('back');
    }
}

module.exports.resolveIssue = async function (req, res) {
    try {
        let issue = await Issue.findById(req.params.id);
        if (issue) {
            issue.status = 'closed';
            issue.save();
            req.flash('success', 'Issue resolved successfully');
            return res.redirect('back');
        } else {
            req.flash('error', 'Cannot resolve issue');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        req.flash('error', 'Cannot resolve issue');
        return res.redirect('back');
    }
}


module.exports.filterIssue = async function (req, res) {
    const key_array = Object.keys(req.body)[0];
    const input_data = JSON.parse(key_array);
    const input_title = input_data.title;
    const input_author = input_data.author;
    const input_label = input_data.label;
    try {
        const issues = await Issue.find({ 'project': input_data.project_id });
        const data = issues.filter(issue => {
            const is_title_present = input_title.some(str => issue.title.toLowerCase().includes(str.toLowerCase()));
            const is_author_present = input_author.some(str => issue.author.toLowerCase().includes(str.toLowerCase()));
            const is_label_present = findCommonElements(input_label, issue.labels);
            return is_title_present || is_author_present || is_label_present;
        });

        if (req.xhr) {
            return res.status(200).json({ data });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ data: [] });
    }

}


function findCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}