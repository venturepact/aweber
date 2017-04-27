var Aweber = {}

var crypto = require("crypto");
var querystring = require('querystring');
var request = require('request');

Aweber._endpoints = require('./resources/end_points');

Aweber._env = {
    protocol: 'https',
    hostSuffix: 'api.aweber.com',
    apiPath: '/1.0',
    timeout : 40000,
    clientVersion: '',
    port : 443,
    auth_token : ''
}

Aweber.configure = function(conf){
    Aweber._util.extend(true, Aweber._env, conf);
}

function createApiFunc(apiCall) {
    return function() {
        return new RequestWrapper(arguments, apiCall);
    };
}

function RequestWrapper(args, apiCall) {
    this.args = args;
    this.httpHeaders = {};
    this.apiCall = apiCall;
    for(var i = 0; i < apiCall.paramNames.length; i++){
        validateIdParam(this.args[0],apiCall.paramNames[i]);
    }
    if(this.args[1] === undefined){
        this.args[1] = {}
    }
    if(apiCall.operation){
        this.args[1]["ws.op"] = apiCall.methodName;
    }
    var env = {};
    Aweber._util.extend(true, env, Aweber._env);
    signatureObject = {
            oauth_consumer_key : env.consumer_key,
            oauth_nonce : Aweber._core.nonce(32),
            oauth_signature_method : 'HMAC-SHA1',
            oauth_timestamp : Math.floor(new Date() / 1000),
            oauth_version : '1.0'
        }
    if(apiCall.class === 'oauth'){

        return Aweber._core.makeOauthRequest(env,this.args,this.apiCall,signatureObject);
    }
    return Aweber._core.makeApiRequest(env,this.args,this.apiCall,signatureObject);
    
}

RequestWrapper.prototype.headers = function(headers) {
    this.httpHeaders = headers;
    return this;
};

function validateIdParam(args, paramName) {
    if (typeof args[paramName] === 'undefined') {
        var errMsg = 'the required parameter' + paramName + 'is missing or wrong'
        throw new Error('the required id parameter missing or wrong');
    }
    return args[paramName];
}

// core module
Aweber._core = (function() {
    var coreRef = {};
    var http = require('http');
    var https = require('https');

    coreRef.makeOauthRequest = function(env,args,apiData,signatureObject){
        var path = getApiURL(env,args,apiData);
        var query = querystring.stringify(args[1]);
        var url = env.protocol+'://' + 'auth.aweber.com' + path;
        if(apiData.urlPrefix == '/oauth/request_token'){
            if(typeof env.oauth_callback == undefined){
                throw new Error('oauth_callback is not provided in configuration');
            }
            signatureObject['auth_token'] = '';
            signatureObject['oauth_callback'] = env.oauth_callback;
            signatureObject['oauth_signature'] = coreRef.get_signature(apiData.httpMethod,url,signatureObject,env.consumer_secret,null,null);
        }else if(apiData.urlPrefix == '/oauth/access_token'){
            if(typeof args[0]['oauth_token'] == undefined || typeof args[0]['oauth_verifier'] == undefined || typeof args[0]['oauth_token_secret'] == undefined){
                throw new Error('oauth_token, oauth_verifier or oauth_token_secret is not provided in the arguments');
            }
            signatureObject['oauth_token'] = args[0]['oauth_token'];
            signatureObject['oauth_verifier'] = args[0]['oauth_verifier'];
            signatureObject['oauth_signature'] = coreRef.get_signature(apiData.httpMethod,url,signatureObject,env.consumer_secret,args[0]['oauth_token_secret'],null);
        }
        var signatureParam = coreRef.setHeader(signatureObject);
        var headers = {
             "Authorization" : signatureParam,
             "Content-Type": "application/json",
        };
        var options = {}
        options['method'] = apiData.httpMethod;
        options['uri'] = url;
        options['headers'] = headers;
        return new Promise((resolve,reject)=>{
            request(options,function(error,response){
                if(error) reject(error);
                else {
                    if(apiData.urlPrefix == '/oauth/request_token') {
                        var splitResponse = response.body.split('&');
                        oauth_token_secret = splitResponse[0].split('=')[1];
                        var authorizeUrl = 'https://auth.aweber.com/1.0/oauth/authorize?' + response.body;
                        resolve({authorizeUrl,oauth_token_secret});
                    }else{
                        var splitResponse = response.body.split('&');
                        var responseBody = {
                            oauth_token_secret : splitResponse[0].split('=')[1],
                            oauth_token : splitResponse[1].split('=')[1]
                        }
                        resolve(responseBody);
                    }
                }
            });
        })

    }

    coreRef.makeApiRequest = function(env,args,apiData,signatureObject) {
        var path = getApiURL(env,args,apiData);
        var query = querystring.stringify(args[1]);
        var url = env.protocol+'://'+getHost(env) + path;

        if(typeof env.oauth_token == undefined || typeof env.oauth_token_secret == undefined){
            throw new Error('oauth_token or oauth_token_secret is not provided in configuration');
        }
        signatureObject['oauth_token'] = env.oauth_token;
        if(apiData.httpMethod == "GET"){
            Aweber._util.extend(true, signatureObject, args[1]);
        }
        signatureObject['oauth_signature'] = coreRef.get_signature(apiData.httpMethod,url,signatureObject,env.consumer_secret,env.oauth_token_secret,null);
        
        var signatureParam = coreRef.setHeader(signatureObject);
        url = env.protocol+'://'+getHost(env) + path;
        var headers = {};
        headers["Authorization"] = signatureParam;
        var options = {}
        if(apiData.httpMethod == "GET" || apiData.httpMethod == "DELETE"){
            options['qs'] = args[1];
        }else if(apiData.httpMethod == "POST" || apiData.httpMethod == "PATCH" || apiData.httpMethod == "PUT"){
            options['body'] = JSON.stringify(args[1]);
            headers["Content-Type"] = 'application/json'
        }
        options['method'] = apiData.httpMethod;
        options['uri'] = url;
        options['headers'] = headers;
        
        return new Promise((resolve,reject)=>{
            request(options,function(error,response){
                if(error) reject(error);
                else resolve(JSON.parse(response.body));
            });
        })

    }

    coreRef.setHeader = function(authData){
        let authString = 'OAuth ';
        for(var i in authData){
            authString += i + '="' + authData[i] + '",'
        }
        authString = authString.slice(0,-1);
        return authString;
    }

    coreRef.get_signature = function(method, url, params, consumer_secret, token_secret, algo) {
      var  data, e, encodedParams, hash, key, paramString, sorted, text;
      if (token_secret == null) {
        token_secret = "";
      }
      if (algo == null) {
        algo = "base64";
      }
      e = encodeURIComponent;
      sorted = Object.keys(params).sort();
      encodedParams = [];
      sorted.map(function(s) {
        return encodedParams.push([s, '=', e(params[s])].join(''));
      });
      paramString = e(encodedParams.join('&'));
      data = [method, e(url), paramString].join('&');
      key = [e(consumer_secret), e(token_secret)].join('&');
      text = data;
      key = key;
      hash = crypto.createHmac('sha1', key).update(text).digest(algo);
      return hash;
    }

    coreRef.nonce = function(len) {
      var s, val;
      s = "";
      while (s.length < len) {
        val = Math.floor(Math.random() * 2);
        if (val === 0) {
          s += String(Math.floor(Math.random() * 10));
        } else {
          s += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
      return s;
    }

    function getApiURL(env,args,apiData) {
        if (typeof env.appId === 'undefined' || typeof env.consumer_key === 'undefined' || typeof env.consumer_secret == 'undefined') {
            throw new Error('Your consumer_key, consumer_secret or appId is not configured.');
        }

        var urlPrefix = apiData.urlPrefix ;
        for ( var i = 0 ; i < apiData.paramNames.length; i++){
            var param = apiData.paramNames[i];
            var reg = new RegExp(':'+ param);
            urlPrefix = urlPrefix.replace(reg,args[0][param]);
        }
        
        return   env.apiPath + urlPrefix;
    }

    function getHost(env) {
        return env.hostSuffix;
    }

    return coreRef;
}).call(this);



//utility module
Aweber._util = (function() {
    var util = {};

    util.extend = function(deep, target, copy) {
        util.extendsFn.call(this, deep, target, copy);
    };

    util.extendsFn = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && typeof target !== "function") {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[ i ]) !== null) {
                for (name in options) {
                    src = target[ name ];
                    copy = options[ name ];

                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (typeof copy === 'object' || (copyIsArray = (util.isArray(copy))))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && util.isArray(src) ? src : [];
                        } else {
                            clone = src && typeof src === 'object' ? src : {};
                        }
                        target[ name ] = util.extend.call(this, deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[ name ] = copy;
                    }
                }
            }
        }
        return target;
    };

    util.indexOf = function(array, item) {
        if (![].indexOf()) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }
            return -1;
        } else {
            return array.indexOf(item);
        }
    };

    util.trim = function(str) {
        return str !== '' ? str : str.replace(/^\s+|\s+$/g, '');
    };

    util.isEmptyObject = function(obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };

    util.isNotUndefinedNEmpty = function(obj) {
        if (typeof obj !== 'undefined' && !util.isEmptyObject(obj)) {
            return true;
        }
        return false;
    };

    util.isArray = Array.isArray || function(obj) {
        return  Object.prototype.toString.call(obj) === '[object Array]';
    };

    util.isFunction = function(obj) {
        return typeof obj === 'function';
    };
    
    return util;
}).call(this);

(function() {
    module.exports.configure = Aweber.configure;
    for (var res in Aweber._endpoints) {
        module.exports[res] = {};
        var apiCalls = Aweber._endpoints[res];
        for (var apiIdx = 0; apiIdx < apiCalls.length; apiIdx++) {
            var metaArr = apiCalls[apiIdx];
            var apiCall = {"methodName": metaArr[0],
                "httpMethod": metaArr[1],
                "urlPrefix": metaArr[2],
                'paramNames' : metaArr[3],
                'operation': metaArr[4],
                "class" : res
                };
            module.exports[res][apiCall.methodName] = createApiFunc(apiCall);
        }
    }
})()