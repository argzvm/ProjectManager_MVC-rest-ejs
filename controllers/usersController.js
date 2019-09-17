const userModel = require('../models/userModel.js');
const notificationModel = require('../models/notificationModel.js');
const passport = require('passport');
const bcrypt = require('bcryptjs');


// GET - create a new user - display page
module.exports.signupGetRequest = function(req, res, next) {
    res.render('users/usersSignup');
};

// POST - create a new user - send notification
module.exports.signupPostRequest = function(req, res, next) {
    let user = req.body;
    user.created =  Date.now();
    user.modified =  Date.now();
    user.login =  Date.now();
    let notification = {};
    notification.username = user.username;
    notification.created = user.created;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash( user.password, salt, function(err, hash) {
            if (err) throw err;
            user.password = hash;
            userModel(user).save()
            .then(
                notificationModel(notification).save()
                .then( () => res.redirect('/usercreated') )
                .catch( (err) => console.error(err) )
            ).catch( (err) => console.error(err) );
        });
    });
};

// GET - log in an existing user - display page
module.exports.loginGetRequest = function(req, res, next) {
    res.render('users/usersLogin');
};

// POST - log in an existing user - send notification
module.exports.loginPostRequest = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/loginerror',
        failureFlash: false
    })(req, res, next);
};

// GET - log out an existing user - send notification
module.exports.logoutGetRequest = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

// GET - retrieve user details
module.exports.userGetRequest = function(req, res, next) {
    userModel.findOne({_id: currentUser._id})
    .then( (data) => res.render('users/usersUser', {data}) )
    .catch( (err) => console.error(err) );
};

// GET - update an existing user info - display page
module.exports.updateGetRequest = function(req, res, next) {
    userModel.findOne({_id: currentUser._id})
    .then( (data) => res.render('users/usersUpdate', {data}) )
    .catch( (err) => console.error(err) );
};

// POST - update an existing user info
module.exports.updatePostRequest = function(req, res, next) {
    let user = {};
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.modified =  Date.now();
    userModel.findByIdAndUpdate(currentUser._id, user)
    .then( () => {
        req.logout();
        res.redirect('/');
    }).catch( (err) => console.error(err) );
};

// GET - delete an existing user - display page
module.exports.deleteGetRequest = function(req, res, next) {
    res.render('users/usersDelete');
};

// POST - delete an existing user
module.exports.deletePostRequest = function(req, res, next) {
    userModel.findByIdAndDelete(currentUser._id)
    .then( () => {
        req.logout();
        res.redirect('/');
    }).catch( (err) => console.error(err) );
};
