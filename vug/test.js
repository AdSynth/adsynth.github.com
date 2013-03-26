QUnit.module('Browser compatibility assertions');

QUnit.test('Required browser functionality', function () {
    QUnit.equal(typeof window, "object", "window");
    QUnit.ok(window.location.href, "url");
    QUnit.ok(window.document.title, "title");
});

QUnit.test('VUG object & api', function () {
    QUnit.equal(typeof window.VASTUrlGenerator, "function", "VASTUrlGenerator");
    var urlGen = new window.VASTUrlGenerator();
    QUnit.equal(typeof urlGen.query, "function", "VASTUrlGenerator.query");
    QUnit.equal(typeof urlGen.val, "function", "VASTUrlGenerator.val");
});

QUnit.test('get/set', function () {
    var urlGen = new window.VASTUrlGenerator();
    QUnit.equal(typeof urlGen, "object", "urlGen");
    QUnit.deepEqual(urlGen.val("notthere"), undefined, "non existant");
    QUnit.deepEqual(urlGen.val("notthere", "jim"), false, "notthere bob should fail");
    QUnit.deepEqual(urlGen.val("notthere"), undefined, "notthere not set");

    QUnit.deepEqual(urlGen.val("br_concat"), undefined, "br_concat should be empty to start");
    QUnit.deepEqual(urlGen.val("br_concat", "cat1,cat2"), true, "set br_concat should work");
    QUnit.deepEqual(urlGen.val("br_concat"), "cat1,cat2", "br_concat set");

    var urlGen2 = new window.VASTUrlGenerator();
    QUnit.deepEqual(urlGen2.val("br_concat"), undefined, "urlGen2 instance should be separate");
});

QUnit.test('query string', function () {
    var urlGen = new window.VASTUrlGenerator();
    urlGen.val("br_srchkw", "life:insurance");
    var query = urlGen.query();
    QUnit.ok(query.indexOf('br_srchkw=life%3Ainsurance') > -1, "br_srchkw in query string");
});

QUnit.test('default values', function () {
    var urlGen = new window.VASTUrlGenerator();
    QUnit.equal(urlGen.val("br_pageurl"), window.location.href, "br_pageurl");
    QUnit.equal(urlGen.val("br_pubdomain"), window.location.hostname, "br_pubdomain");
    QUnit.equal(urlGen.val("br_conkw"), "meta keyword 1, meta keyword 2", "meta keywords");
    QUnit.equal(urlGen.val("br_condes"), "my meta description", "meta description");
    QUnit.equal(urlGen.val("br_conlang"), "en", "language");
});

QUnit.test('pattern checking', function () {
    var urlGen = new window.VASTUrlGenerator();
    QUnit.equal(urlGen.val("br_conlen", "asdf"), false, "invalid number");
    QUnit.equal(urlGen.val("br_conlen"), undefined, "invalid number not set");
    QUnit.equal(urlGen.val("br_conlen", "92342"), true, "valid number");
    QUnit.equal(urlGen.val("br_conlen"), 92342, "valid number set");

    QUnit.equal(urlGen.val("br_conurl", "asdf"), false, "invalid url");
    QUnit.equal(urlGen.val("br_conurl"), undefined, "invalid url not set");
    QUnit.equal(urlGen.val("br_conurl", "http://adsynth.com"), true, "valid url");
    QUnit.equal(urlGen.val("br_conurl"), "http://adsynth.com","valid url set");
});

QUnit.test('values checking', function () {
    var urlGen = new window.VASTUrlGenerator();
    QUnit.equal(urlGen.val("br_source", "asdf"), false, "invalid value");
    QUnit.equal(urlGen.val("br_source"), undefined, "invalid value not set");
    QUnit.equal(urlGen.val("br_source", "i"), true, "valid value");
    QUnit.equal(urlGen.val("br_source"), "i","valid value set");

});

