var _ = require('underscore');
var keywords = ['extend', 'mixin', 'statics'];

Function.prototype.$isFunction = true;

var extendClass = function (superClass, subClass) {
    if (superClass && subClass) {
        var f = function () {
        };
        f.prototype = superClass.prototype;
        subClass.prototype = new f();
        subClass.prototype.constructor = subClass;
        subClass.$superClass = superClass;
    }
};

var mixinClass = function (self, mixin) {
    if (!self || !mixin) {
        return;
    }
    var mix = function (mixin) {
        _.each(mixin, function (value, key) {
            if (key in keywords)
                return;
            self.prototype[key] = value;
        });
    };

    if (_.isObject(mixin)) {
        if (_.isFunction(mixin)) {
            mix(new mixin());
            return;
        }
        if (_.isArray(mixin)) {
            _.each(mixin, function (oneMixin) {
                mix(oneMixin);
            });
            return;
        }
        mix(mixin);
    }
};

var Base = function () {
};

Base.prototype.callParent = function () {
    var caller = arguments.callee.caller,
        thisClass = caller.$ownerClass,
        superClass = thisClass.$superClass;
    var superFn = superClass.prototype[caller.$name];
    if (superFn && superFn.$isFunction) {
        return superFn.apply(this, arguments);
    }
};

exports.define = function (cfg) {
    var fn = function () {
    };
    var val,
        superClass = cfg.extend || Base;
    extendClass(superClass, fn);
    mixinClass(fn, cfg.mixin);
    var _proto = fn.prototype;
    for (var p in cfg) {
        if (p === 'extend') {
            continue;
        }
        val = cfg[p];
        //only create class function
        if (val.$isFunction) {
            val.$name = p;
            val.$ownerClass = fn;
            _proto[p] = val;
        }
    }
    fn.$superClassName = superClass;
    return fn;
};