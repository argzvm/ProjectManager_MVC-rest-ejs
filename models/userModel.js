const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
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
    login: {
        type: Date,
        required: false
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
