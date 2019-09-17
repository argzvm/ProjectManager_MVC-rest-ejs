const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

global.currentUser;

const helmet = require('helmet');
const compression = require('compression');
const keys = require('./config/keys.js');

// database
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
.then( () => console.log("database connected") )
.catch( (err) => console.error(err) );

// app init
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// passport config & middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// routes
app.use('/', require('./routes/routes.js'));

// port listening
app.listen(process.env.PORT || 3000, function(){
    console.log('listening for requests on port 3000');
});
