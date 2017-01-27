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
