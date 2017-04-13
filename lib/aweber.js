var Aweber = {}

var Q = require("q");

Aweber._endpoints = require('./resources/end_points.js');

Aweber._env = {
    protocol: 'https',
    hostSuffix: 'api.aweber.com',
    apiPath: '/1.0',
    timeout : 40000,
    clientVersion: '',
    port : 443 
}

Aweber.configure = function(conf){
    Aweber._util.extend(true, ChargeBee._env, conf);
}

function RequestWrapper(args, apiCall) {
    this.args = args;
    this.httpHeaders = {};
    this.apiCall = apiCall;
    if (this.apiCall.hasIdInUrl) {
        validateIdParam(this.args[0]);
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
    } else if(typeof callBack !== 'undefined' && callBack.constructor === jsonConstructor && !ChargeBee._util.isFunction(callBack)){
        ChargeBee._util.extend(true, env, callBack);
        callBack = undefined;
    }
    var deferred = ChargeBee._util.createDeferred(callBack);
    var urlIdParam = this.apiCall.hasIdInUrl ? this.args[0] : null;
    var params = this.apiCall.hasIdInUrl ? this.args[1] : this.args[0];
    if (typeof callBack !== 'undefined' && !ChargeBee._util.isFunction(callBack)) {
        throw new Error('The callback parameter passed is incorrect.');
    } 
    function callBackWrapper(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    };
    ChargeBee._core.makeApiRequest(env, callBackWrapper, this.apiCall.httpMethod, this.apiCall.urlPrefix, this.apiCall.urlSuffix, urlIdParam, params, this.httpHeaders, this.apiCall.isListReq);
    return deferred.promise;
};

function validateIdParam(idParam) {
    if (typeof idParam === 'undefined' || typeof idParam !== 'string' || idParam.trim() < 1) {
        throw new Error('the required id parameter missing or wrong');
    }
    return idParam;
}


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


