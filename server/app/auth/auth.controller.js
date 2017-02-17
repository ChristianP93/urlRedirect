'use strict';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import { User } from './user.model.js';

export class controllerAuth{
   // curl --header "Content-Type: application/json" 'http://localhost:3000/user/create/' --data-binary '{"user": {"mail":"christianpengu@gmail.com","password":"miao"}}'
  static async createUser(req, res, next) {
   let possible = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
   let token = '';
   let result = 0;
   if(!!!req.body.user){
     res.status(400).json({'success': false, 'data': 'Missing user'});
     return next();
   }

   for (var i = 0; i < 15; i++) {
     token += possible.charAt(Math.floor(Math.random() * possible.length))
   }

   User.find({'_id': req.body.user._id}, function(err, user){
     if(user.mail === req.body.user.mail ){
        res.status(409).json({'success': false, 'err': 'mail exist'});
        return next();
      };
      bcrypt.hash(req.body.user.password, null, null, function(err, password) {
        let user = new User({'mail': req.body.user.mail, 'password': password, 'token': token});
        user.save(function(err, user){
          if(err) {
            res.status(500).json({'success': false, 'data': err});
            return next();
          }
          res.status(201).json({'success': true, 'token': token});
          return next();
        })
      });

   });
 };

  static async getToken(req, res, next) {
   // curl --request GET --header "Content-Type: application/json" 'http://localhost:3000/get/token/' --data-binary '{"user": {"mail":"christianpengu@gmail.com","password":"miao"}}'
    let token = false;
    let response = false;
    if(!!!req.body.user){
      res.status(400).json({'success': false, 'data': 'Missing user'});
      return next();
    }

    return User.findOne({'_id': req.body.user._id}, function(err, response){
      console.log(response);
      if(response.mail === req.body.user.mail ){
        res = bcrypt.compareSync(req.body.user.password, response.password);
        token = response.token;
      }
      res === true ? res.status(200).json({'success': true, 'token': token}) : res.status(400).json({'success': false, 'response': 'wrong password'});
      return next();
    });
  };
}
