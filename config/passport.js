const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel.js');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            function (username, password, done) {
                userModel.findOne( {username: username}, function(err, user) {
                    if (err) throw err;
                    if (user) {
                        bcrypt.compare( password, user.password, function(err, isMatch) {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done( null, false, {message: 'Wrong password'} );
                            }
                        });
                    } else {
                        return done( null, false, {message: 'No user found'} );
                    }
                });
            }
        )
    );
    passport.serializeUser( function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser( function(id, done) {
        userModel.findById( id, function(err, user) {
            done(err, user);
        });
    });
}
