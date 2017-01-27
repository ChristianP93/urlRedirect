import chai from 'chai';
const expect = chai.expect();
import request from 'superagent';
import { SERVER_TEST } from '../CONFIG/properties';

const validUrl = {
  "referId":"user123654",
  "gender" : "m",
  "notaType": "brand",
  "vendorId": "null",
  "productId": "123456",
  "acquiredIn" : "03/07/2016",
  "geoInfo": "Roma"
}

it('should post new url [POST /api/v1/url/link]', (done)=>{
  request
    .post(SERVER_TEST + '/api/v1/url/link')
    .send({'bo':validUrl})
    .on('error', done)
    .end((res)=>{
      console.log(res);
    })
})

// it('should get all the categories [POST /v1/categories]', function(done) {
//     request
//       .get(testUtils.url + '/v1/categories')
//       .set('Authorization', 'Bearer ' + oauthToken)
//       .on('error', done)
//       .end(function(res){
//             log.debug(res.body.categories);
//             res.statusCode.should.equal(200); // OK
//             should.exist(res.body.categories);
//             res.body.categories.should.be.an('array');
//             //res.body.categories.should.have.length(3);
//             res.body.categories.should.have.length.of.at.least(3);
//             res.body.categories.should.all.have.a.property('_id');
//             res.body.categories.should.all.have.a.property('title');
//             res.body.categories.should.all.have.a.property('icon');
//             res.body.categories.should.all.not.have.a.property('tags');
//             for(var i=0; i<res.body.categories; i++){
//               res.body.categories[i].sorting.shoould.equal(i);
//             }
//             done();
//       });
//   });
