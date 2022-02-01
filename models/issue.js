const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    // ongoing, resolved
    status: {
        type: String,
        require: true,
        default: 'ongoing'
    },

    author: {
        type: String,
        require: true
    },

    // issue belongs to a project
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },

    // an issue can have multiple labels,
    // bug, documentation, duplicate, enhancement, invalid, compilance, RFI, Observation
    labels: [
        {
            type: String,
        }
    ]

}, {
    timestamps: true,
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;