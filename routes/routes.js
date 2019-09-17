const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const projectsController = require('../controllers/projectsController.js');
const usersController = require('../controllers/usersController.js');


// main routes

// access public - homepage
router.get('/', mainController.homepageGetRequest);
// access private - dashboard
router.get ('/dashboard', isAuth, mainController.dashboardGetRequest);
// access public - user created
router.get('/usercreated', mainController.usercreatedGetRequest);
// access public - login error
router.get('/loginerror', mainController.loginerrorGetRequest);


// project routes

// access private - create a new project
router.get ('/projects/create', isAuth, projectsController.createGetRequest);
router.post ('/projects/create', isAuth, projectsController.createPostRequest);

// access private - retrieve full project list
router.get ('/projects/list', isAuth, projectsController.projectlistGetRequest);

// access private - retrieve project details
router.get ('/projects/project/:id', isAuth, projectsController.projectidGetRequest);

// access private - update an existing project info
router.get ('/projects/update/:id', isAuth, projectsController.updateGetRequest);
router.post ('/projects/update/:id', isAuth, projectsController.updatePostRequest);

// access private - delete an existing project
router.get ('/projects/delete/:id', isAuth, projectsController.deleteGetRequest);
router.post ('/projects/delete/:id', isAuth, projectsController.deletePostRequest);


// user routes

// access public - create a new user
router.get ('/signup', usersController.signupGetRequest);
router.post ('/signup', usersController.signupPostRequest);

// access public - log in an existing user
router.get ('/login', usersController.loginGetRequest);
router.post ('/login', usersController.loginPostRequest);

// access public - log out an existing user
router.get ('/logout', usersController.logoutGetRequest);

// access private - retrieve user details
router.get ('/users/user', isAuth, usersController.userGetRequest);

// access private - update an existing user info
router.get ('/users/update', isAuth, usersController.updateGetRequest);
router.post ('/users/update', isAuth, usersController.updatePostRequest);

// access private - delete an existing user
router.get ('/users/delete', isAuth, usersController.deleteGetRequest);
router.post ('/users/delete', isAuth, usersController.deletePostRequest);


// check if user is authenticated
function isAuth (req, res, next) {
    if (req.isAuthenticated()) {
        currentUser = req.user;
        return next();
    } else {
        currentUser = null;
        res.render('unauthorized')
    }
}


module.exports = router;
