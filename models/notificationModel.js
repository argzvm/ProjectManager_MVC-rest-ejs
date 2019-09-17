const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({
    title: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    }
});

const notificationModel = mongoose.model('Notification', notificationSchema);
module.exports = notificationModel;
