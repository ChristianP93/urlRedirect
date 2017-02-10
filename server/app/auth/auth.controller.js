'use strict';
import pg from "pg";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';

dotenv.load();
const POSTGRES_INFO = process.env.POSTGRES_INFO;

export class controllerAuth{
  // curl --request POST 'http://localhost:3000/api/v1//user/create/' -v

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
   pg.connect(POSTGRES_INFO, (err, client, done) => {
     const query = client.query('SELECT * FROM users ORDER BY _id ASC');
     query.on('row', (row) => {
       if(row.mail === req.body.user.mail ){
         result = 1;
       }
     });

     query.on('end', ()=>{
      if(result === 1){
         res.status(409).json({'success': false, 'err': 'mail exist'});
         return next();
      }
      bcrypt.hash(req.body.user.password, null, null, function(err, password) {
        pg.connect(POSTGRES_INFO, (err, client, done) => {
         if(err) {
           res.status(500).json({'success': false, 'data': err});
           return next();
         }

         const querycreate = client.query('INSERT INTO users (mail, password, token) values($1, $2, $3)',
         [ req.body.user.mail, password, token ]);

         querycreate.on('end', () => {
           res.status(201).json({'success': true, 'token': token});
           return next();
         });
       });
      });
    });
   });
 };

  static async getToken(req, res, next) {
   // curl --request GET --header "Content-Type: application/json" 'http://localhost:3000/get/token/' --data-binary '{"user": {"mail":"christianpengu@gmail.com","password":"miao"}}'
    let token = false;
    let response = false;
    console.log(req.body);

    if(!!!req.body.user){
      res.status(400).json({'success': false, 'data': 'Missing user'});
      return next();
    }

    pg.connect(POSTGRES_INFO, (err, client, done) => {
      const query = client.query('SELECT * FROM users ORDER BY _id ASC');
      query.on('row', (row) => {
        if(row.mail === req.body.user.mail ){
          response = bcrypt.compareSync(req.body.user.password, row.password);
          token = row.token;
        }
      });

      query.on('end', () => {
        response === true ? res.status(200).json({'success': true, 'token': token}) : res.status(400).json({'success': false, 'response': 'wrong password'});
        return next();
      });
    });
  };

}
