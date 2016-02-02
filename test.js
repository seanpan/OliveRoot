var Root = require('./root');
var A = Root.define({
    a: 1
});
var B = Root.define({
    initialize: function () {
        console.log('init...')
    },
    mixin: {
        a: 2,
        b: 3
    },
    say: function (cnt) {
        console.log("B" + cnt);
        this.callParent(cnt);
    }
});
var BB = Root.define({
    extend: B,
    mixin: A,
    say: function (cnt) {
        console.log("BB" + cnt);
        this.callParent(cnt);
    }
});
var BBB = Root.define({
    extend: BB,
    say: function (cnt) {
        console.log("BBB" + cnt);
        this.callParent(cnt);
    }
});
var bb = new BBB();
bb.say("-say");
console.log(bb.a);