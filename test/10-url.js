import chai from 'chai';
const expect = chai.expect();
import request from 'superagent';
import { SERVER_TEST } from '../CONFIG/properties';
import { server } from '../index';
const should = chai.should();

it('Success: should post new url [GET /api/v1/url/link]', (done)=>{
  request
    .get(SERVER_TEST + '/link?url=http%3A%2F%2Fgoogle.com/&referId=user123654&gender=m&notaType=brand&vendorId=null&productId=123456&acquiredIn=03/07/2016&geoInfo=Roma')
    .on('error', done)
    .end((err, res)=>{
      res.statusCode.should.equal(200);
      res.redirects[0].should.be.equal('http://google.com/');
      res.redirects.should.be.instanceof(Array).and.have.lengthOf(2);
      return done();
    });
});

it('Error: should post new url [GET /api/v1/url/link]', (done)=>{
  request
    .get(SERVER_TEST + '/link?ur=http://google.com&referId=user123654&gender=m&notaType=brand&vendorId=null&productId=123456&acquiredIn=03/07/2016&geoInfo=Roma')
    .on('error', (res)=>{
      let response = JSON.parse(res.response.text);
      res.status.should.equal(400);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(false);
      response.should.have.property('data');
      response.data.should.equal('Missing url');
    })
    .end((err, res)=>{
      return done();
    });
});

it('Success: should get all url [GET /api/v1/url/link/]', (done)=>{
  request
    .get(SERVER_TEST + '/api/v1/url/link/')
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(200);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(true);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array);
      return done();
    });
});

it('Success: should single all url [GET /api/v1/url/link/:id]', (done)=>{
  let id = 185;
  request
    .get(SERVER_TEST + '/api/v1/url/link/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(201);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(true);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array).and.have.lengthOf(1);
      return done();
    });
});

it('Err: should get single url [GET /api/v1/url/link/:id]', (done)=>{
  let id = 800000000;
  request
    .get(SERVER_TEST + '/api/v1/url/link/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(404);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(false);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array).and.have.lengthOf(0);
      return done();
    });
});

it('Success: should get all url by user [GET /api/v1/url/userId/:userId]', (done)=>{
  let id = 'user123654';
  request
    .get(SERVER_TEST + '/api/v1/url/userId/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(201);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(true);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array);
      return done();
    });
});

it('Err: should get all url by user[GET /api/v1/url/userId/:userId]', (done)=>{
  let id = 800000000;
  request
    .get(SERVER_TEST + '/api/v1/url/link/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(404);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(false);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array).and.have.lengthOf(0);
      return done();
    });
});

it('Success: should get all url by product [GET /api/v1/url/product/:productId]', (done)=>{
  let id = '123456';
  request
    .get(SERVER_TEST + '/api/v1/url/product/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(201);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(true);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array);
      return done();
    });
});

it('Err: should get all url by product [GET /api/v1/url/product/:productId]', (done)=>{
  let id = 800000000;
  request
    .get(SERVER_TEST + '/api/v1/url/product/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(404);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(false);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array).and.have.lengthOf(0);
      return done();
    });
});

it('Success: should get all url by brand [GET /api/v1/url/brand/:productId]', (done)=>{
  let id = '1';
  request
    .get(SERVER_TEST + '/api/v1/url/brand/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(201);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(true);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array);
      return done();
    });
});

it('Err: should get all url by brand [GET /api/v1/url/brand/:productId]', (done)=>{
  let id = 800000000;
  request
    .get(SERVER_TEST + '/api/v1/url/brand/' + id)
    .on('error', (res) => {
    })
    .end((err, res)=>{
      let response = res.body;
      res.statusCode.should.equal(404);
      res.should.be.json;
      response.should.be.a('object');
      response.should.have.property('success');
      response.success.should.equal(false);
      response.should.have.property('result');
      response.result.should.be.instanceof(Array).and.have.lengthOf(0);
      return done();
    });
});
