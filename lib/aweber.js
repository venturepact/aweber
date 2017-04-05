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

RequestWrapper.prototype.headers = function(headers) {
    this.httpHeaders = headers;
    return this;
};

function validateIdParam(idParam) {
    if (typeof idParam === 'undefined' || typeof idParam !== 'string' || idParam.trim() < 1) {
        throw new Error('the required id parameter missing or wrong');
    }
    return idParam;
}


