var Root = require('./root');
var A = Root.define({
    a: 1
});
var D = Root.define({
    d: 2
});
var B = Root.define({
    initialize: function () {
        console.log('init...')
    },
    say: function (cnt) {
        console.log("B" + cnt);
        this.callParent(cnt);
    }
});
var BB = Root.define({
    extend: B,
    say: function (cnt) {
        console.log("BB" + cnt);
        this.callParent(cnt);
    }
});
var BBB = Root.define({
    extend: BB,
    mixin: [A, [D]],
    say: function (cnt) {
        console.log("BBB" + cnt);
        this.callParent(cnt);
    }
});
var bb = new BBB({c: 2});
bb.say("-say");
console.log(bb.a, bb.d, bb.options);