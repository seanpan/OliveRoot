"use strict";

var _ = require('underscore');
var keywords = ['extend', 'mixin', 'statics'];

//TODO object or function both support, for private member injection
exports.define = function (options) {
    var klass = function () {
        //initialize
        var initialize = options.initialize || this.initialize;
        if (_.isFunction(initialize))
            initialize.apply(this, arguments);

        var self = this;

        //mixin
        var mixin = options.mixin;
        if (mixin) {
            if (_.isObject(mixin)) {
                if (_.isFunction(mixin))
                    mixin = new mixin();
                _.each(mixin, function (value, key) {
                    if (key in keywords)
                        return;
                    self[key] = value;
                });
            }
            else
                console.error('Incorrect mixin type, a CLASS/OBJECT is required.')
        }

        //public
        _.each(options, function (value, key) {
            if (key in keywords)
                return;
            self[key] = value;
        });
    };

    //extend
    var extend = options.extend;
    if (extend) {
        if (_.isFunction(extend))
            klass.prototype = new extend();
        else
            console.error('Incorrect extension type, a CLASS is required.')
    }

    //static
    var statics = options.statics;
    if (statics) {
        if (_.isObject(statics)) {
            _.each(statics, function (value, key) {
                klass[key] = value;
            });
        }
        else
            console.error('Incorrect static definition, an OBJECT is required.')
    }

    return klass;
};