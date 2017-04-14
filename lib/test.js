var Aweber = {}

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


function testingExtension(){
    let obj1 = {
        'prop1' : 'value1',
        'prop2' : 'value2',
        'pop3' : 'value3',
    }

    let obj2 = {
        'pp1' : 'v1',
        'pp2' : 'v2',
        'pop3' : 'v3',
    }

    Aweber._util.extend(true,obj1,obj2);
    console.log(obj1,obj2);
}

testingExt()