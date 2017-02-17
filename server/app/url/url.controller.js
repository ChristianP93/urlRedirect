import { Url } from './url.model.js';
export class controllerUrl{
  static async create(req, res, next) {
    // http://127.0.0.1:3000/link?url=http://google.com&userId=user123654&gender=m&notaType=null&notification=idnotifica&vendorId=1&productId=null&acquired=03/07/2016&geoInfo=Roma
    // http://127.0.0.1:3000/link?url=http%3A%2F%2Fgoogle.com&userId=user123657&gender=m&notaType=banner&notification=null&vendorId=2&productId=1233522&acquired=03/07/2016&geoInfo=Roma
    if (!!!req.query.url) {
      res.status(400).json({'success': false, 'data': 'Missing url'});
      return next();
    }

    let url = new Url({userId: req.query.userId, created: new Date(),
      url: req.query.url, gender: req.query.gender, notatype: req.query.notaType,
      notification: req.query.notification, acquired: req.query.acquired, geoinfo: req.query.geoInfo,
      vendorId: req.query.vendorId, productId: req.query.productId
    });

    url.save((err, url)=>{
      if(err){
        res.status(400).json({'success': false, 'data': err.toString()});
        return next();
      }

      res.status(302).redirect(url.url);
      return next();
    });
  }

  static async getAllInfo(req, res, next){
      // curl --request GET 'http://localhost:3000/api/v1/url/info/' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
    return Url.find(function(err, result){
      if(err){
        res.status(500).json({'success': false,'result': 'Error find'});
        return next();
      }
      if(result === undefined){
        res.status(404).json({'success': false,'result': []});
        return next();
      }
      let users = [];
      let product = [];
      let brand = [];
      result.map((index, value) => {
        if (users.indexOf(index.userId) == -1) {
          users.push(index.userId);
        };
        if (product.indexOf(index.productId) == -1) {
          if(index.productId != 'null') product.push(index.productId);
        };
        if (brand.indexOf(index.vendorId) == -1) {
          if(index.vendorId != 'null') brand.push(index.vendorId);
        };
      });
      res.status(200).json({'success': true,'users': users, 'product': product, 'brand': brand});
      return next();
    });
  }

  static async readAll(req, res, next){
  // curl --request GET 'http://localhost:3000/api/v1/url/link/' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
    return Url.find(function(err, result){
      if(err){
        res.status(500).json({'success': false,'result': 'Error find'});
        return next();
      }
      if(result === undefined){
        res.status(404).json({'success': false,'result': []});
        return next();
      }
      res.status(200).json({'success': true,'result': result});
      return next();

    });
  }

  static async readSingle(req, res, next){
    // curl --request GET 'http://localhost:3000/api/v1/url/link/58a6d3a8df26b727eb5f1088' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
    if (!!!req.params.urlId){
      res.status(400).json({'success': false,'error': 'Missing id'});
      return next();
    }

     let urlId = [req.params.urlId];

     return Url.findOne({'_id': urlId}, function(err, result){
       if(err){
         res.status(500).json({'success': false,'result': 'Error find'});
         return next();
       }
       if(result === undefined){
         res.status(404).json({'success': false,'result': []});
         return next();
       }
       res.status(201).json({'success': true,'result': result});
       return next();
     });
   };

   static async getLinkByUser(req, res, next){
    //  user123654
     // curl --request GET 'http://localhost:3000/api/v1/url/userId/user123654' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
     let result = [];
     if (!!!req.params.userId){
       res.status(400).json({'success': false,'error': 'Missing userId'});
        return next();
      }

      let usrId = req.params.userId;
      return Url.find({'userId': usrId}, function(err, result){
        if(err){
          res.status(500).json({'success': false,'result': 'Error find'});
          return next();
        }
        if(result === undefined){
          res.status(404).json({'success': false,'result': []});
          return next();
        }
        res.status(201).json({'success': true,'result': result});
        return next();
      })
    }

    static async getLinkByProduct (req, res, next){
      //http://localhost:3000/api/v1/url/product/123456
      // curl --request GET 'http://localhost:3000/api/v1/url/product/1233522' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
     if (!!!req.params.productId){
       res.status(400).json({'success': false,'error': 'Missing productId'});
        return next();
      }

      let productId = req.params.productId;
      return Url.find({'productId': productId}, function(err, result){
        if(err){
          res.status(500).json({'success': false,'result': 'Error find'});
          return next();
        }
        if(result === undefined){
          res.status(404).json({'success': false,'result': []});
          return next();
        }
        res.status(201).json({'success': true,'result': result});
        return next();
      });
    }

    static async getLinkByBrand (req, res, next){
      //http://localhost:3000/api/v1/url/brand/123456745855885
      // curl --request GET 'http://localhost:3000/api/v1/url/brand/1' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
      if (!!!req.params.vendorId){
       res.status(400).json({'success': false,'error': 'Missing vendorId'});
        return next();
      }

      let vendorId = req.params.vendorId;
      return Url.find({'vendorId': vendorId}, function(err, result){
        if(err){
          res.status(500).json({'success': false,'result': 'Error find'});
          return next();
        }
        if(result === undefined){
          res.status(404).json({'success': false,'result': []});
          return next();
        }
        res.status(201).json({'success': true,'result': result});
        return next();
      });
    }
  //
  //   static async getLinkByUserToBrand (req, res, next){
  //     //http://localhost:3000/api/v1/url/user/user123652/brand/123456745855885
  //     // curl --request GET 'http://localhost:3000/api/v1/url/user/user123652/brand/123456745855885' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
  //
  //     next();
  //   }
  //
  //   static async getLinkByUserByProduct (req, res, next){
  //     //http://localhost:3000/api/v1/url/user/:userId/product/:productId
  //     // curl --request GET 'http://localhost:3000/api/v1/url/user/user123652/:productId' -H 'Authorization: Bearer 2NhQz3AyhnbWex8' -v
  //
  //     next();
  //   }

}
