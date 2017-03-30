var api = require('../dist/api');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('/GET ',function(){
  it('it should check root url',function(done){
    chai.request(api).get('/').end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain("WELCOME TO THE GAME");
      done();
    });
  });
});

describe('/GET ',function(){
  it('it should marco url',function(done){
    var testData = {"START": 1, "END": 1000, "PERLINE": 10};
    chai.request(api).get("/" + testData.START + "/" + testData.END + "/" + testData.PERLINE).end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain("marco");
      expect(res.text).to.contain("polo");
      expect(res.text).to.contain("marcopolo");
      done();
    });
  });
});