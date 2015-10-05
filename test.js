"use strict";

var root = require('./Root.js');

var ParentClass = root.define({
    initialize: function () {
        console.log('initialize passed with params:', arguments);
    },
    publicMember: function () {
        console.log('public member called with params', arguments)
    }
});

var MixinClass = root.define({
    mixinMember: function () {
        console.log('mixin member called with params', arguments);
    }
});

var MyClass = root.define({
    extend: ParentClass,
    mixin: MixinClass,
    statics: {
        staticMember: function () {
            console.log('static member called with params', arguments);
        }
    },
    customizedMember: function () {
        console.log('customizedMember in my.');
    }
});

var ChildClass = root.define({
    extend: MyClass,
    customizedMember: function(){
        this.callParent();
        console.log('customizedMember in child.');
    }
});

var parentInstance = new ParentClass('parent');

var instance = new MyClass('child');
console.log('constructor', MyClass.constructor);
instance.publicMember();
instance.mixinMember();
MyClass.staticMember();

var childInstance = new ChildClass();
childInstance.publicMember();
childInstance.mixinMember();
