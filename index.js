var http = require('http');
var https = require('https');
var utils = require('zefti-utils');

function Request(options){
  if (!options) options = {};
  this.requestOptions = {};
  this.requestOptions.hostname = options.hostname;
  this.requestOptions.port = options.port || 80;
  this.requestOptions.path = options.path || '';
  this.requestProtocol = http.request;
  this.retries = options.retries || 0;
  if (options.protocol === 'https') this.requestProtocol = https.request;
  if (options.body) this.requestOptions.body = options.body;
  if (options.headers) {
    this.requestOptions.headers = options.headers;
  } else {
    this.requestOptions.headers = {};
  }
  if (!this.requestOptions.headers['Content-Type']) this.requestOptions.headers['Content-Type'] = 'application/json';
  this.immediate = function(){};
  return this;
}

function findProtocol(requestProtocol, options){
  if (options.protocol){
    if (options.protocol === 'https') {
      requestProtocol = https.request;
    } else {
      requestProtocol = http.request;
    }
  }
  return requestProtocol;
}

function queryRetry(requestProtocol, totalOptions, retries, executedRetries, cb){
  var intRetries = retries;
  query(requestProtocol, totalOptions, function(err, res){
    if(res && res.statusCode) {
      var statusDigit = res.statusCode.toString()[0];
    }
    if (res && statusDigit && statusDigit === '2') {
      return cb(err, res)
    } else {
      if (intRetries > 0) {
        intRetries--;
        executedRetries++;
        queryRetry(requestProtocol, totalOptions, intRetries, executedRetries, cb);
      } else {
        if (!err) err = {statusCode: res.statusCode, executedRetries:executedRetries};
        return cb(err, null);
      }
    }
  });
}

Request.prototype.post = function(body, options, cb){
  var parsedArgs = requestArgParse.apply(requestArgParse, arguments);
  var body = parsedArgs.body;
  var options = parsedArgs.options;
  var cb = parsedArgs.cb;
  options.body = body;
  var totalOptions = parseNewOptions(this.requestOptions, options);
  var requestProtocol = findProtocol(this.requestProtocol, options);
  totalOptions.method = 'POST';
  if (!totalOptions.headers) totalOptions.headers = {};
  queryRetry(requestProtocol, totalOptions, this.retries, 0, cb);
};

Request.prototype.get = function(queryString, options, cb){
  var parsedArgs = getArgParse.apply(requestArgParse, arguments);
  var queryString = parsedArgs.body;
  var options = parsedArgs.options;
  var cb = parsedArgs.cb;
  var totalOptions = parseNewOptions(this.requestOptions, options);
  var requestProtocol = findProtocol(this.requestProtocol, options);
  totalOptions.method = 'GET';
  queryRetry(requestProtocol, totalOptions, this.retries, 0, cb);
};

Request.prototype.put = function(body, options, cb){
  var parsedArgs = requestArgParse.apply(requestArgParse, arguments);
  var body = parsedArgs.body;
  var options = parsedArgs.options;
  var cb = parsedArgs.cb;
  options.body = body;
  var totalOptions = parseNewOptions(this.requestOptions, options);
  var requestProtocol = findProtocol(this.requestProtocol, options);
  totalOptions.method = 'PUT';
  queryRetry(requestProtocol, totalOptions, this.retries, 0, cb);
};

Request.prototype.del = function(body, options, cb){
  var parsedArgs = requestArgParse.apply(requestArgParse, arguments);
  var body = parsedArgs.body;
  var options = parsedArgs.options;
  var cb = parsedArgs.cb;
  options.body = body;
  var totalOptions = parseNewOptions(this.requestOptions, options);
  var requestProtocol = findProtocol(this.requestProtocol, options);
  totalOptions.method = 'DELETE';
  queryRetry(requestProtocol, totalOptions, this.retries, 0, cb);
};

function requestArgParse(){
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 3) return {body:args[0], options:args[1], cb:args[2]};
  if (args.length === 2 && utils.type(args[1]) === 'function') {
    if(args[0].options === true){
      return {body:{}, options: args[0], cb:args[1]};
    }
    return {body:args[0], options: {}, cb:args[1]};
  }
  if (args.length === 2 && utils.type(args[1]) !== 'function') return {body:args[0], options: args[1], cb:function(){}};
  if (args.length === 1 && utils.type(args[0]) === 'object') return ({body:args[0], options: {}, cb:function(){}});
  if (args.length === 1 && utils.type(args[0]) === 'function') return ({body:{}, options:{}, cb:args[0]});
  //TODO: log an error, non standard format
  return {body:{}, options:{}, cb:function(){}};
}

function getArgParse(){
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 3) return {body:args[0], options:args[1], cb:args[2]};
  if (args.length === 2 && utils.type(args[1]) === 'function') {
    if(args[0].options === true){
      return {body:{}, options: args[0], cb:args[1]};
    }
    return {body:args[0], options: {}, cb:args[1]};
  }
  if (args.length === 2 && utils.type(args[1]) !== 'function') return {body:args[0], options: args[1], cb:function(){}};
  if (args.length === 1 && utils.type(args[0]) === 'object') return ({body:args[0], options: {}, cb:function(){}});
  if (args.length === 1 && utils.type(args[0]) === 'function') return ({body:{}, options:{}, cb:args[0]});
  //TODO: log an error, non standard format
  return {body:{}, options:{}, cb:function(){}};
}

function parseNewOptions(base, extended){
  var newOptions = {};
  newOptions.hostname = extended.hostname || base.hostname;
  newOptions.port = extended.port || base.port;
  newOptions.path = extended.path || base.path;
  newOptions.body = extended.body || base.body;
  newOptions.headers = extended.headers || base.headers;
  return newOptions;
}

function query(requestProtocol, options, cb){
  //console.log('request options:::::::');
  //console.log(options);
  if (!options.hostname) return cb('hostname is required for query');
  var chunks = [];
  var req = requestProtocol(options, function(res) {
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });
    res.on('close', function(err) {
      cb(err, null);
    });
    res.on('end', function() {
      res.body = chunks.join('');
      cb(null, res);
    });
  });
  req.on('error', function(err) {
    cb(err);
  });
  if (!options.body) {
    req.end();
    return;
  }
  if (options.body) {
    if(utils.type(options.body) !== 'string'){
      req.write(JSON.stringify(options.body));
    }else{
      req.write(options.body);
    }
    req.end();
    return;
  }
  req.end();
  return;
}

module.exports = Request;