/* Code to constrct urls for VAST requests, dynamically filling in data where feasible */

(function() {

    var number = /^[0-9]+$/,
        url = /https*:\/\//,
        ynu = ['y', 'n', 'u'];

    var map = {
        required: {
            'n':            {pattern: number, deflt: parseInt(Math.random() * 10000042, 10)},
            'br_w':         {pattern: number},
            'br_h':         {pattern: number},
            'br_source':    {values: ['d', 'i']},
            'br_adtype':    {values: ['p', 'i', 'e']},
            'br_adpos':     {values: ['a', 'b', 'u'], deflt: 'u'},
            'br_autopl':    {values: ['u', 'a']},
            'br_sound':     {values: ['o', 'f']},
            'br_comp':      {pattern: /^[0-9]{2,4}x[0-9]{2,4}$/, deflt: "0"},
            'br_comptype':  {values: ['s', 'h', 'i', 'n']},
            'br_pageurl':   {pattern: url, deflt: window.location.href},
            'br_conurl':    {pattern: url}
        },
        recommended: {
            'br_contype':   {values: ['v', 'g', 'm', 'a', 't', 'o', 'u'], deflt: 'u'},
            'br_embeddable':{values: ynu, deflt: 'u'},
            'br_concat':    {},
            'br_pagecat':   {},
            'br_seccat':    {},
            'br_sitecat':   {},
            'br_medrate':   {values: ['a', 'o', 'm']},
            'br_privpol':   {values: ynu, deflt: 'u'},
            'br_conlen':    {pattern: number},
            'br_conid':     {},
            'br_conkw':     {deflt: getMetaName('keywords')},
            'br_srchkw':    {deflt: getSearch(document.referrer) || getSearch(location.href)},
            'br_skip':      {values: ynu, deflt: 'u'},
            'br_skipoffset':{pattern: number},
            'br_pubname':   {},
            'br_pubdomain': {deflt: window.location.hostname }
        },
        optional: {
            'br_connm':     {},
            'br_pagenm':    {deflt: window.document.title},
            'br_demgen':    {values: ['m', 'f']},
            'br_propnm':    {},
            'br_propid':    {},
            'br_stddelay':  {pattern: number},
            'br_medbitr':   {pattern: number},
            'br_medfing':   {},
            'br_appver':    {},
            'br_condes':    {deflt: getMetaName('description')},
            'br_refurl':    {deflt: document.referrer || undefined},
            'br_conlang':   {deflt: getLanguage()},
            'br_custom':    {}
        }
    };

    // Entry point
    var VUG = function() {
        this.params = {};

        // Fill in the default values
        for (var type in map) {
            for (var n in map[type]) {
                if (typeof map[type][n].deflt != "undefined") {
                    this.params[n] = map[type][n].deflt;
                }
            }
        }
    };


    // Get/set the parameters, depending on the number of arguments.
    // Perform error checking on:
    // * If the variable exists in the config map
    // * Regexp matching
    // * Values testing (if the value is one of the possible values)
    VUG.prototype.val = function(name, value) {
        if (arguments.length == 1) {
            return this.params[name];
        } else {
            var config = getConfig(name);
            if (config === undefined) {
                window.console && console.log("Unrecognized field name", name);
                return false;
            }
            if (config.values && config.values.indexOf(value) == -1) {
                window.console && console.log("Invalid value for", name, config.values);
                return false;
            }
            if (config.pattern && !config.pattern.test(value)) {
                window.console && console.log("Invalid pattern for", name, config.pattern.toString());
                return false;
            }
            this.params[name] = value;
            return true;
        }
    };

    // Make a query string out of the parameters
    VUG.prototype.query = function() {
        var out = [];
        for (var name in this.params) {
            if (this.params[name] !== undefined) {
                out.push(name + '=' + escape("" + this.params[name]));
            }
        }
        return '?' + out.join('&');
    };

   // Public
    window.VASTUrlGenerator = VUG;

    // Helper functions

    // return the config for the supplied name
    function getConfig(name) {
        for (var type in map) {
            for (var n in map[type]) {
                if (name == n) {
                    return map[type][n];
                }
            }
        }
        return undefined;
    }

    function getMetaName(name) {
        var tags = document.getElementsByTagName("meta");
        for (var i = 0, l = tags.length; i < l; i++) {
            console.log("checking", tags[i].name, "against", name);
            if (tags[i].name == name) {
                return tags[i].content;
            }
        }
        return undefined;
    }

    function getSearch(url) {
        // Look for q=keyword in the url
        var m = (/[?&;]q=([^&;]+)/).exec(url);
        /* global unescape: true */
        return m && unescape(m[1]) || undefined;
    }

    /* Normalize the language of the browser.
     * May vary depending on platform based on what the OS exposes
     * FF, Safari, Chrome, Camino use 'language'
     * Opera uses browserLanguage and userLanguage
     * IE uses 'systemLanguage', and 'userLanguage'
     */
    function getLanguage() {
        var n = navigator,
            l = n.language || n.systemLanguage || n.browserLanguage || n.userLanguage || "";
        return l.substring(0,2);
    }

})();
