var Aweber = {}

var Q = require("q");
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
    console.log(args,'<------arguments');
    this.args = args;
    this.httpHeaders = {};
    this.apiCall = apiCall;
    if(!Array.isArray(this.args[0])){
        throw new Error('the params should be specified in array');
    }
    for(var i = 0; i < apiCall.paramNames.length; i++){
        validateIdParam(this.args[0][i],apiCall.paramNames[i]);
    }
    if(this.args[1] === undefined){
        this.args[1] = {}
    }
    if(this.args[2] === undefined){
        this.args[2] = {}
    }
    
}

RequestWrapper.prototype.headers = function(headers) {
    this.httpHeaders = headers;
    return this;
};

RequestWrapper.prototype.request = function(callBack, envOptions) {
    var env = {};
    var jsonConstructor =  {}.constructor;
    Aweber._util.extend(true, env, Aweber._env);
    if (typeof envOptions !== 'undefined') {
        Aweber._util.extend(true, env, envOptions);
    } else if(typeof callBack !== 'undefined' && callBack.constructor === jsonConstructor && !Aweber._util.isFunction(callBack)){
        Aweber._util.extend(true, env, callBack);
        callBack = undefined;
    }
    var deferred = Aweber._util.createDeferred(callBack);
    var urlIdParam = this.apiCall.hasIdInUrl ? this.args[0] : null;
    var params = this.apiCall.hasIdInUrl ? this.args[1] : this.args[0];
    if (typeof callBack !== 'undefined' && !Aweber._util.isFunction(callBack)) {
        throw new Error('The callback parameter passed is incorrect.');
    } 
    function callBackWrapper(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    };
    Aweber._core.makeApiRequest(env, callBackWrapper, this.apiCall.httpMethod, this.apiCall.urlPrefix, this.apiCall.urlSuffix, urlIdParam, params, this.httpHeaders, this.apiCall.isListReq, this.apiCall.class);
    return deferred.promise;
};

function validateIdParam(idParam, paramName) {
    if (typeof idParam === 'undefined' || typeof idParam !== 'string' || idParam.trim() < 1) {
        var errMsg = 'the required parameter' + paramName + 'is missing or wrong'
        throw new Error('the required id parameter missing or wrong');
    }
    return idParam;
}

// core module
Aweber._core = (function() {
    var coreRef = {};
    var http = require('http');
    var https = require('https');

    coreRef.timeoutHandler = function(req, callBack) {
        return function() {
            req._isAborted = true;
            req.abort();
            throwError(callBack,'io_error', 504, 'timeout', 'request aborted due to timeout.');
        };

    };

    coreRef.responseHandler = function(req, callBack) {
        return function(res) {
            var response = '';
            // res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response += chunk;
            });
            res.on('end', function() {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    throwError(callBack,'client_error', 500, 'invalid_json', 'invalid json in response. Probably not a Aweber response', e);
                }
                if (res.statusCode < 200 || res.statusCode > 299) {
                    response.http_status_code = res.statusCode;
                    callBack(response, null);
                } else {
                    callBack(null, response);
                }
            });
        };
    };

    coreRef.errorHandler = function(req, callBack) {
        return function(error) {
            if (req._isAborted)
                return;
            throwError(callBack,'io_error', 503, 'connection_error', 'connection error while making request.', error);
        };
    };

    coreRef.makeApiRequest = function(env, callBack, httpMethod, urlPrefix, urlSuffix, urlIdParam, params, headers, isListReq, subClass) {
        var path = getApiURL(env, urlPrefix, urlSuffix, urlIdParam, subClass);
        signatureObject = {
            oauth_consumer_key : env.consumer_key,
            oauth_nonce : coreRef.nonce(32),
            oauth_signature_method : 'HMAC-SHA1',
            oauth_timestamp : Math.floor(new Date() / 1000),
            oauth_version : '1.0'
        }
        var url = env.protocol+'://'+getHost(env) + path;

        if(urlPrefix == '/oauth/request_token'){
            if(typeof env.oauth_callback == undefined){
                throw new Error('oauth_callback is not provided in configuration');
            }
            signatureObject['auth_token'] = '';
            signatureObject['oauth_callback'] = env.oauth_callback;
            signatureObject['oauth_signature'] = coreRef.get_signature(httpMethod,url,signatureObject,env.consumer_secret,null,null);
        }else if(urlPrefix == '/oauth/access_token'){
            if(typeof env.oauth_token == undefined || typeof env.oauth_verifier == undefined || typeof env.oauth_token_secret == undefined){
                throw new Error('oauth_token, oauth_verifier or oauth_token_secret is not provided in configuration');
            }
            signatureObject['oauth_token'] = env.oauth_token;
            signatureObject['oauth_verifier'] = env.oauth_verifier;
            signatureObject['oauth_signature'] = coreRef.get_signature(httpMethod,url,signatureObject,env.consumer_secret,env.oauth_token_secret,null);
        }else{
            if(typeof env.oauth_token == undefined || typeof env.oauth_token_secret == undefined){
                throw new Error('oauth_token or oauth_token_secret is not provided in configuration');
            }
            signatureObject['oauth_token'] = env.oauth_token;
            signatureObject['oauth_signature'] = coreRef.get_signature(httpMethod,url,signatureObject,env.consumer_secret,env.oauth_token_secret,null);
        }
        var signatureParam = querystring.stringify(signatureObject);
        
        path += '?' + signatureParam; 
        url = env.protocol+'://'+getHost(env) + path;
        if(httpMethod == "POST"){
            Aweber._util.extend(true, headers, {
                'Content-Type': 'application/x-www-form-urlencoded',
                "content-length": signatureParam.length,
            });
        }
        var options = {
            uri : url,
            method : httpMethod,
            headers : headers
        };
        console.log(options,'()()()()()()()()()()');
        request(options,callBack);
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

    function getApiURL(env, urlPrefix, urlSuffix, urlIdParam,subClass) {
        if (typeof env.appId === 'undefined' || typeof env.consumer_key === 'undefined' || typeof env.consumer_secret == 'undefined') {
            throw new Error('Your site or api key is not configured.');
        }
        return   env.apiPath + urlPrefix + (urlIdParam !== null ? 
            '/' + encodeURIComponent(urlIdParam) : '') + (urlSuffix !== null ? urlSuffix : '');
    }

    function getHost(env) {
        return env.hostSuffix;
    }

    var encodeListParams = function(paramObj) {
        var key, value;
        for (key in paramObj) {
            value = paramObj[key];
            if(typeof value !== 'undefined' && value !== null && Aweber._util.isArray(value)){
                paramObj[key] = JSON.stringify(value);
            }else{
                paramObj[key] = value;
            }
        }
        return encodeParams(paramObj);
    }

    var encodeParams = function(paramObj, serialized, scope, index) {
        var key, value;
        if (typeof serialized === 'undefined' || serialized === null) {
            serialized = [];
        }
        for (key in paramObj) {
            value = paramObj[key];
            if (scope) {
                key = "" + scope + "[" + key + "]";
            }
            if (typeof index !== 'undefined' && index !== null) {
                key = key + "[" + index + "]";
            }

            if (Aweber._util.isArray(value)) {
                for (var arrIdx = 0; arrIdx < value.length; arrIdx++) {
                    if (typeof value[arrIdx] === 'object' || Aweber._util.isArray(value[arrIdx])) {
                        encodeParams(value[arrIdx], serialized, key, arrIdx);
                    } else {
                        if (typeof value[arrIdx] !== 'undefined') {
                            serialized.push(encodeURIComponent(key + "[" + arrIdx + "]") + "=" + encodeURIComponent(Aweber._util.trim(value[arrIdx]) !== '' ? value[arrIdx] : ''));
                        }
                    }
                }
            } else if(key === "meta_data") {
                var attrVal="";
                if(value !== null) {
                    attrVal = encodeURIComponent(Object.prototype.toString.call(value) === "[object String]" ? Aweber._util.trim(value) : JSON.stringify(value));
                }
                serialized.push(encodeURIComponent(key) + "=" + attrVal);    
            } else if (typeof value === 'object' && !Aweber._util.isArray(value)) {
                encodeParams(value, serialized, key);
            } else {
                if (typeof value !== 'undefined') {
                    serialized.push(encodeURIComponent(key) + "=" + encodeURIComponent(Aweber._util.trim(value) !== '' ? value : ''));
                }
            }
        }

        return serialized.join('&').replace(/%20/g, '+');
    };
    var throwError = function(callBack,type,httpStatusCode, errorCode, message, detail) {
        var error = {
            'message': message,
            'type':type,
            'api_error_code':errorCode,
            'http_status_code':httpStatusCode,

            'http_code': httpStatusCode,
            'error_code': errorCode,
        };
        if (typeof detail !== "undefined") {
            error['detail'] = detail;
        }
        return callBack(error, null);
    };

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

    util.createDeferred = function(callback) {
        var deferred = Q.defer();
        if (callback) {
            deferred.promise.then(function(res) {
                setTimeout(function() {
                    callback(null, res);
                }, 0);
            }, function(err) {
                setTimeout(function() {
                    callback(err, null);
                }, 0);
            });
        };
        return deferred;
    };
    return util;

}).call(this);

(function() {
    module.exports.configure = Aweber.configure;
    for (var res in Aweber._endpoints) {
        Aweber._env.hostSuffix = (res == 'oauth' ?  'auth.aweber.com' : 'api.aweber.com' ); 
        module.exports[res] = {};
        var apiCalls = Aweber._endpoints[res];
        for (var apiIdx = 0; apiIdx < apiCalls.length; apiIdx++) {
            var metaArr = apiCalls[apiIdx];
            var apiCall = {"methodName": metaArr[0],
                "httpMethod": metaArr[1],
                "urlPrefix": metaArr[2],
                'paramNames' : metaArr[3],
                "class" : res
                // "urlSuffix": metaArr[3],
                // "hasIdInUrl": metaArr[4],
                // "isListReq" : metaArr[0]==="list",
                };
            module.exports[res][apiCall.methodName] = createApiFunc(apiCall);
        }
    }
})();