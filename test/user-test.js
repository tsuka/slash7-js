(function ($ns) {
    module("User");

    test("genUid", function () {
        var uid1 = $ns.User.genUid(),
            uid2 = $ns.User.genUid();
        equal(uid1.length, 16);
        notEqual(uid1, uid2);
    });

    test("fromCookieString", function () {
        var u = $ns.User.fromCookieString("1.web.abc.123");
        equal(u.uidType, "web");
        equal(u.uid, "abc");
        equal(u.visitCount, 123);
    });

    test("cookieString", function () {
        var u = new $ns.User("web", "abc", 123);
        equal(u.cookieString(), "1.web.abc.123");
    });

    test("get new", function () {
        var stub = sinon.stub($ns.Cookie, "get");
        var u = $ns.User.get();
        ok(u.uid);
        equal(u.visitCount, 0);
        stub.restore();
    });

    test("get cookie", function () {
        var stub = sinon.stub($ns.Cookie, "get").returns("1.web.abc.123");
        var u = $ns.User.get();
        equal(u.uid, "abc");
        equal(u.visitCount, 123);
        stub.restore();
    });

    test("setUserAttribute", function () {
        var u = $ns.User.get();
        u.setUserAttribute("abc", "def");
        deepEqual(u.unsentUserAttribute, {"abc": "def"});
    });

    test("setUserAttribute _var", function () {
        var u = $ns.User.get();
        u.setUserAttribute("_abc", "def");
        deepEqual(u.unsentUserAttribute, {});
    });

    test("popUserAttribute", function () {
        var u = $ns.User.get();
        u.setUserAttribute("abc", "def");
        u.setUserAttribute("xyz", "123");
        deepEqual(u.popUserAttribute(), {abc: "def", xyz: "123"});
    });

    test("identify", function () {
        var u = $ns.User.get();
        u.identify("user0123");
        equal(u.uidType, "app");
        equal(u.uid, "user0123");
    });
}(slash7));
