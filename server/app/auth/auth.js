'use strict';

import passport from 'passport'
import Bearer from 'passport-http-bearer';
import pg from "pg";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';

dotenv.load();
const BearerStrategy = Bearer.Strategy;
const POSTGRES_INFO = process.env.POSTGRES_INFO;


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

    pg.connect(POSTGRES_INFO, (err, client, done) => {
      const query = client.query('SELECT * FROM users ORDER BY _id ASC');
      query.on('row', (row) => {
        if(row.token === accessToken ){
          response = true;
          user = row;
        }
      });

      query.on('end', () => {
        if (response) {
          return next(null, user);
        }else{
          return next(null, false, {'message': 'Unknown user'});
        }
      });
    });
  }
));


module.exports = auth;
