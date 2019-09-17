const projectModel = require('../models/projectModel.js');
const notificationModel = require('../models/notificationModel.js');

// GET - get the last 3 modified projects
module.exports.homepageGetRequest = function (req, res, next) {
   res.render('homepage');
};

// GET - get the last 6 notifications
module.exports.dashboardGetRequest = function (req, res, next) {
    let tdata = {};
    projectModel.find({}).sort({modified: -1}).limit(5)
    .then( (data) => {
        tdata.projects = data;
        notificationModel.find({}).sort({modified: -1}).limit(10)
        .then( (data) => {
            tdata.notifications = data;
            res.render('dashboard', {tdata});
        }).catch( (err) => console.error(err) );
    }).catch( (err) => console.error(err) );
};

// GET - get the last 3 modified projects
module.exports.usercreatedGetRequest = function (req, res, next) {
    res.render('usercreated');
};

// GET - get the last 3 modified projects
module.exports.loginerrorGetRequest = function (req, res, next) {
    res.render('loginerror');
};
