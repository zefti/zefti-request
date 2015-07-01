var assert = require('assert');
var Request = require('zefti-request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var getResponse = {'msg': 'mockget'};
var postValue = 'mockpost';



/*
 *
 * Fake server with endpoints for get, post, put, delete
 *
 */
app.get('/mockget', function(req, res, next){
  res.send(getResponse);
});

app.post('/mockpost', function(req, res, next){
  var responseObj = {'msg' : postValue};
  for (var key in req.body) {
    responseObj[key] = req.body[key];
  }
  res.send(responseObj)
});

app.put('/mockput', function(req, res, next){
  var responseObj = {'msg' : postValue};
  for (var key in req.body) {
    responseObj[key] = req.body[key];
  }
  res.send(responseObj);
});

app.delete('/mockdel', function(req, res, next){
  var responseObj = {'msg' : postValue};
  for (var key in req.body) {
    responseObj[key] = req.body[key];
  }
  res.send(responseObj);
});

app.get('/errget500', function(req, res, next){
  res.status(500).send({});
});

app.post('/errpost500', function(req, res, next){
  res.status(500).send({});
});

app.put('/errput500', function(req, res, next){
  res.status(500).send({});
});

app.delete('/errdel500', function(req, res, next){
  res.status(500).send({});
});

var server = app.listen(6000);



describe('RETRIES', function(){
  describe('GET', function(){
    var retries = 10;
    var localErr10Retries = new Request({hostname: 'localhost', port: 6000, path: '/errget500', retries: retries});
    var localErr0Retries = new Request({hostname: 'localhost', port: 6000, path: '/errget500'});
    it('should err 500 with 10 retries', function (done) {
      localErr10Retries.get(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 10)
        done();
      });
    });

    it('should err 500 with 0 retries', function (done) {
      localErr0Retries.get(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 00)
        done();
      });
    });
  });

  describe('POST', function(){
    var retries = 10;
    var localErr10Retries = new Request({hostname: 'localhost', port: 6000, path: '/errpost500', retries: retries});
    var localErr0Retries = new Request({hostname: 'localhost', port: 6000, path: '/errpost500'});
    it('should err 500 with 10 retries', function (done) {
      localErr10Retries.post(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 10)
        done();
      });
    });

    it('should err 500 with 0 retries', function (done) {
      localErr0Retries.post(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 00)
        done();
      });
    });
  });

  describe('PUT', function(){
    var retries = 10;
    var localErr10Retries = new Request({hostname: 'localhost', port: 6000, path: '/errput500', retries: retries});
    var localErr0Retries = new Request({hostname: 'localhost', port: 6000, path: '/errput500x'});
    it('should err 500 with 10 retries', function (done) {
      localErr10Retries.put(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 10)
        done();
      });
    });

    it('should err 500 with 0 retries', function (done) {
      localErr0Retries.put(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 00)
        done();
      });
    });
  });

  describe('DEL', function(){
    var retries = 10;
    var localErr10Retries = new Request({hostname: 'localhost', port: 6000, path: '/errdel500', retries: retries});
    var localErr0Retries = new Request({hostname: 'localhost', port: 6000, path: '/errdel500'});
    it('should err 500 with 10 retries', function (done) {
      localErr10Retries.del(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 10)
        done();
      });
    });

    it('should err 500 with 0 retries', function (done) {
      localErr0Retries.del(function (err, res) {
        assert(err);
        assert.equal(typeof payload, 'undefined');
        assert.equal(err.executedRetries, 00)
        done();
      });
    });
  });
});



describe('GET', function(){
  describe('pre-instntiated server', function() {
    var localhostMockget = new Request({hostname: 'localhost', port: 6000, path: '/mockget'});
    var google = new Request({hostname: 'www.google.com'});

    it('should be ok to GET to mock get endpoint with empty object', function (done) {
      localhostMockget.get({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return back expected value sending GET to mock get endpoint with empty object', function (done) {
      localhostMockget.get({}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.msg, 'mockget');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should be ok to GET to mock endpoint with callback only', function (done) {
      localhostMockget.get(function (err, res) {
        if (err) throw new Error(err);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return back expected value sending GET to mock get endpoint with callback only', function (done) {
      localhostMockget.get({}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.msg, 'mockget');
        assert.equal(res.statusCode, 200);
        done();
      });
    });


    it('should return back a response when sending a get to google', function (done) {
      google.get({}, function (err, res) {
        if (err) throw new Error(err);
        done();
      });
    });

    it('should be ok to GET to google with callback only', function (done) {
      google.get(function (err, res) {
        if (err) throw new Error(err);
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('on-demand request', function(){
    var request = new Request();

    it('should return back a response with when sending GET to mock get endpoint with options = true', function (done) {
      request.get({hostname:'localhost', path:'/mockget', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should be OK to send a request with an empty object and options object', function (done) {
      request.get({}, {hostname:'localhost', path:'/mockget', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return back expected value when sending empty object and options object', function (done) {
      request.get({}, {hostname:'localhost', path:'/mockget', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.msg, 'mockget');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should err when sending options when options field not set to true', function (done) {
      request.get({hostname:'localhost', path:'/mockget', port:6000}, function (err, res) {
        assert.equal(typeof err, 'string');
        assert.equal(typeof payload, 'undefined');
        done();
      });
    });

    it('should return back a response when sending a get to google', function (done) {
      request.get({hostname:'www.google.com', options:true}, function (err, res) {
        if (err) throw new Error(err);
        //assert.equal(typeof payload, 'object');
        done();
      });
    });
  });

});

describe('POST', function() {
  describe('setup request instance', function () {
    var localhostMockpost = new Request({hostname: 'localhost', port: 6000, path: '/mockpost'});
    var google = new Request({hostname: 'www.google.com'});

    it('should return back a response with no err when sending POST to mock get endpoint', function (done) {
      localhostMockpost.post({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return expected value when sending POST to mock get endpoint', function (done) {
      localhostMockpost.post({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });


    it('should return posted value sending POST to mock get endpoint', function (done) {
      localhostMockpost.post({test:'testvalue'}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, 'testvalue');
        assert.equal(res.statusCode, 200);
        done();
      });
    });


  });

  describe('on demand instance', function () {
    var request = new Request();
    it('should return back a response with no err when sending POST to mock get endpoint', function (done) {
      request.post({}, {hostname:'localhost', path:'/mockpost', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return expected value when sending POST to mock get endpoint', function (done) {
      request.post({}, {hostname:'localhost', path:'/mockpost', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return posted value sending POST to mock get endpoint', function (done) {
      request.post({test:'testvalue'}, {hostname:'localhost', path:'/mockpost', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, 'testvalue');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should be ok to send only options with options === true', function (done) {
      request.post({hostname:'localhost', path:'/mockpost', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should err when sending only options with options !== true', function (done) {
      request.post({hostname:'localhost', path:'/mockpost', port:6000}, function (err, res) {
        assert.equal(typeof err, 'string');
        assert.equal(typeof payload, 'undefined');
        done();
      });
    });
  });

});




describe('PUT', function() {
  describe('setup request instance', function () {
    var localhostMockPut = new Request({hostname: 'localhost', port: 6000, path: '/mockput'});

    it('should return back a response with no err to mock put endpoint', function (done) {
      localhostMockPut.put({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return expected value back to mock put endpoint', function (done) {
      localhostMockPut.put({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });


    it('should return sent value for mock put endpoint', function (done) {
      localhostMockPut.put({test:postValue}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, postValue);
        done();
      });
    });

  });

  describe('on demand instance', function () {
    var request = new Request();
    it('should return back a response with no err when sending POST to mock get endpoint', function (done) {
      request.put({}, {hostname:'localhost', path:'/mockput', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return expected value when sending POST to mock get endpoint', function (done) {
      request.put({}, {hostname:'localhost', path:'/mockput', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return posted value sending POST to mock get endpoint', function (done) {
      request.put({test:'testvalue'}, {hostname:'localhost', path:'/mockput', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, 'testvalue');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should be ok to send only options with options === true', function (done) {
      request.put({hostname:'localhost', path:'/mockput', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should err when sending only options with options !== true', function (done) {
      request.put({hostname:'localhost', path:'/mockput', port:6000}, function (err, res) {
        assert.equal(typeof err, 'string');
        assert.equal(typeof payload, 'undefined');
        done();
      });
    });
  });

});

describe('DEL', function() {
  describe('setup request instance', function () {
    var localhostMockDel = new Request({hostname: 'localhost', port: 6000, path: '/mockdel'});

    it('should return back a response with no err when sending DEL to mock get endpoint', function (done) {
      localhostMockDel.del({}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });


    it('should return back expected value sending DEL to mock get endpoint', function (done) {
      localhostMockDel.del({}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.msg, postValue);
        done();
      });
    });

    it('should return back sent value to mock get endpoint', function (done) {
      localhostMockDel.del({test:'testvalue'}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, 'testvalue');
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });


  describe('on demand instance', function () {
    var request = new Request();
    it('should return back a response with no err', function (done) {
      request.del({}, {hostname:'localhost', path:'/mockdel', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return expected value', function (done) {
      request.del({}, {hostname:'localhost', path:'/mockdel', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return sent value to mock get endpoint', function (done) {
      request.del({test:'testvalue'}, {hostname:'localhost', path:'/mockdel', port:6000}, function (err, res) {
        if (err) throw new Error(err);
        var parsedBody = JSON.parse(res.body);
        assert.equal(parsedBody.test, 'testvalue');
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should be ok to send only options with options === true', function (done) {
      request.del({hostname:'localhost', path:'/mockdel', port:6000, options:true}, function (err, res) {
        if (err) throw new Error(err);
        assert(res);
        assert(res.body);
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should err when sending only options with options !== true', function (done) {
      request.del({hostname:'localhost', path:'/mockdel', port:6000}, function (err, res) {
        assert.equal(typeof err, 'string');
        assert.equal(typeof payload, 'undefined');
        done();
      });
    });
  });
});
