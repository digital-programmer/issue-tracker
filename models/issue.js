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

    label: {
        type: String,
        require: true,
        default: 'open'
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

}, {
    timestamps: true,
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;