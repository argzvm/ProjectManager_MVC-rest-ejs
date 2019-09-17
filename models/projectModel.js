const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    modified: {
        type: Date,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    }
});

const projectModel = mongoose.model('Project', projectSchema);
module.exports = projectModel;
