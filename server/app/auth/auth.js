'use strict';

import passport from 'passport'
import Bearer from 'passport-http-bearer';
import { User } from './user.model.js';
import bcrypt from 'bcrypt-nodejs';

const BearerStrategy = Bearer.Strategy;

var auth = {
  bearer: () => {
    return passport.authenticate('bearer', {session: false});
  }
};

passport.use('bearer', new BearerStrategy(
  (accessToken, next) => {
    let user = false;
    let response = false;
    if(!!!accessToken){
      return next(null, false);
    }

    User.findOne({'token': accessToken}, function(err, response){
      return next(null, response);
    });
  }
));

module.exports = auth;
