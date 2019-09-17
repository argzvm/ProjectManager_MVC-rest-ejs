const projectModel = require('../models/projectModel.js');
const notificationModel = require('../models/notificationModel.js');


// GET - create a new project - display page
module.exports.createGetRequest = function(req, res, next) {
    res.render('projects/projectsCreate');
};

// POST - create a new project - send notification
module.exports.createPostRequest = function(req, res, next) {
    let project = req.body;
    project.userId = req.user._id;
    project.username = req.user.username;
    project.created =  Date.now();
    project.modified =  Date.now();
    let notification = {};
    notification.title = project.title;
    notification.username = req.user.username;
    notification.modified = project.modified;
    projectModel(project).save()
    .then(
        notificationModel(notification).save()
        .then( () => res.redirect('/projects/list') )
        .catch( (err) => console.error(err) )
    ).catch( (err) => console.error(err) );
};

// GET - retrieve full project list
module.exports.projectlistGetRequest = function(req, res, next) {
    projectModel.find({})
    .then( (projects) => res.render('projects/projectsList', {projects}) )    
    .catch( (err) => console.error(err) );
};

// GET - retrieve project details
module.exports.projectidGetRequest = function(req, res, next) {
    projectModel.findOne({_id: req.params.id})
    .then( (data) => res.render('projects/projectsProjectId', {data}) )    
    .catch( (err) => console.error(err) );
};

// GET - update an existing project info - display page
module.exports.updateGetRequest = function(req, res, next) {
    projectModel.findOne({_id: req.params.id})
    .then( (data) => res.render('projects/projectsUpdateId', {data}) )    
    .catch( (err) => console.error(err) );
};

// POST - update an existing project info - send notification
module.exports.updatePostRequest = function(req, res, next) {
    let project = req.body;
    project.modified =  Date.now();
    let notification = {};
    notification.title = project.title;
    notification.username = req.user.username;
    notification.modified = project.modified;
    projectModel.findByIdAndUpdate(req.params.id, project)
    .then(
        notificationModel(notification).save()
        .then( () => res.redirect('/projects/list') )
        .catch( (err) => console.error(err) )
    ).catch( (err) => console.error(err) );
};

// GET - delete an existing project - display page
module.exports.deleteGetRequest = function(req, res, next) {
    res.render('projects/projectsDeleteId');
};

// POST - delete an existing project - send notification
module.exports.deletePostRequest = function(req, res, next) {
    projectModel.findByIdAndDelete(req.params.id)
    .then( () => res.redirect('/projects/list') )
    .catch( (err) => console.error(err) );
};
