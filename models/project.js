const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    // include the array of ids of all issues of a project
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ],

    author: {
        type: String,
        require: true
    },

    status: {
        type: String,
        default: 'open'
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;