import { Client } from '..//database/db'

import pg from "pg";
import { POSTGRES_INFO } from "../../infoDb";
import querystring from 'querystring';

export class controllerUrl{
  static async create(req, res, next) {
    // http://127.0.0.1:3000/link?url=http://google.com&referId=user123654&gender=m&notaType=brand&vendorId=1&productId=null&acquiredIn=03/07/2016&geoInfo=Roma
    // http://127.0.0.1:3000/link?url=http%3A%2F%2Fgoogle.com&referId=user123654&gender=m&notaType=brand&vendorId=1&productId=null&acquiredIn=03/07/2016&geoInfo=Roma

     let results = [];
     let DateNow = new Date();
     if (!!!req.query.url) {
       res.status(400).json({'success': false, 'data': 'Missing url'});
       return next();
     }

     let url = req.query.url;

     pg.connect(POSTGRES_INFO, (err, client, done) => {
      if(err) {
        res.status(500).json({'success': false, 'data': err});
        return next();
      }
      const query = client.query('INSERT INTO pg_url(refer, created, url, gender, notatype, acquiredIn, geoinfo, vendorId, productId) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [ req.query.referId, DateNow, url, req.query.gender, req.query.notaType, req.query.acquiredIn, req.query.geoInfo, req.query.vendorId, req.query.productId]);
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        res.status(302).redirect(url);
        return next();
      });
    });
  }

  static async readAll(req, res, next){
    // curl --request GET 'http://localhost:3000/api/v1/url/link/' -v
    // http://localhost:3000/api/v1/url/link/
    let result = [];
    pg.connect(POSTGRES_INFO, (err,client,done)=>{
      if(err){
        res.status(500).json({'success': false, 'data': err});
        return next();
      };
      const query = client.query('SELECT * FROM pg_url ORDER BY _id ASC');
      query.on('row', (row) => {
        result.push(row);
      });
      query.on('end', (row)=>{
        res.status(200).json({'success': true,'result': result});
        return next();
      });
    });
  }

  static async readSingle(req, res, next){
    // http://localhost:3000/api/v1/url/link/185
    let result = [];
    if (!!!req.params.urlId){
      res.status(400).json({'success': false,'error': 'Missing id'});
       return next();
     }

     let urlId = [req.params.urlId];

     pg.connect(POSTGRES_INFO, (err, client, done)=>{
       if(err){
         res.status(500).json({'success':false, 'data':err});
         return next();
       };

     const query=client.query('SELECT * FROM pg_url WHERE _id=($1)', urlId);
       query.on('row', (row)=>{
         result.push(row);
       });
       query.on('end', (row)=>{
         if(row.rowCount === 0) {
           res.status(404).json({'success': false,'result': []});
           return next();
         }
         res.status(201).json({'success': true,'result': result});
         return next();
       });
     });

   }

   static async getLinkByUser(req, res, next){
     //http://localhost:3000/api/v1/url/userId/user123654
     let result = [];
     if (!!!req.params.userId){
       res.status(400).json({'success': false,'error': 'Missing userId'});
        return next();
      }

      let urlId = [req.params.userId];

      pg.connect(POSTGRES_INFO, (err, client, done)=>{
        if(err){
          res.status(500).json({'success':false, 'data':err});
          return next();
        };

      const query=client.query('SELECT * FROM pg_url WHERE refer=($1)', urlId);
        query.on('row', (row)=>{
          result.push(row);
        });
        query.on('end', (row)=>{
          if(row.rowCount === 0) {
            res.status(404).json({'success': false,'result': []});
            return next();
          }
          res.status(201).json({'success': true, "result": result});
          return next();
        });
      });
    }

    static async getLinkByProduct (req, res, next){
      //http://localhost:3000/api/v1/url/product/123456

      let result = [];
      if (!!!req.params.productId){
        res.status(400).json({'success': false,'error': 'Missing productId'});
         return next();
       }
      pg.connect(POSTGRES_INFO, (err, client,done)=>{
        if(err){
          res.status(500).json({'success':false, 'data':err});
          return next();
        };

        const query = client.query('SELECT * FROM pg_url WHERE productId=($1)', [req.params.productId]);
        query.on('row', (row)=>{
          result.push(row);
        });

        query.on('end', (row)=>{
          if(row.rowCount === 0) {
            res.status(404).json({'success': false,'result': []});
            return next();
          }
          res.status(201).json({'success': true, 'result': result})
          return next();
        });
      });
    }

    static async getLinkByBrand (req, res, next){
      //http://localhost:3000/api/v1/url/brand/123456745855885
      let result = [];
      if (!!!req.params.vendorId){
        res.status(400).json({'success': false,'error': 'Missing brand'});
         return next();
       }
      pg.connect(POSTGRES_INFO, (err, client,done)=>{
        if(err){
          res.status(500).json({'success':false, 'data':err});
          done();
          return next();
        };

        const query = client.query('SELECT * FROM pg_url WHERE vendorId=($1)', [req.params.vendorId]);
        query.on('row', (row)=>{
          result.push(row);
        });
        query.on('end', (row)=>{
          if(row.rowCount === 0) {
            res.status(404).json({'success': false,'result': []});
            return next();
          }
          res.status(201).json({'success': true, 'result': result})
        });
      });
    }

    static async getLinkByUserToBrand (req, res, next){
      //http://localhost:3000/api/v1/url/user/user123652/brand/123456745855885

    }

    static async getLinkByUserByProduct (req, res, next){
      //http://localhost:3000/api/v1/url/user/:userId/product/:productId

    }

}
