var Root = require('./root');
var B = Root.define({
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
    mixin: [
        {a: 1},
        {b: 2}
    ],
    say: function (cnt) {
        console.log("BBB" + cnt);
        this.callParent(cnt);
    }
});
var bb = new BBB();
bb.say("-say");
console.log(bb.a);