
window.ResultsCtrl = function($scope) {
    $scope.results = [
        {name: 'n',            description: 'Random number for cache busting', source: "Generated with Math.random"},
        {name: 'br_w',         description: 'Player width'},
        {name: 'br_h',         description: 'Player height'},
        {name: 'br_source',    description: 'Traffic is direct 3rd party (d/i)'},
        {name: 'br_adtype',    description: 'p - precedes content, i - does not precede, e - does not precede content and expandables'},
        {name: 'br_adpos',     description: 'a - above the fold, b - below, u - unknown', source: "Default"},
        {name: 'br_autopl',    description: 'u - user initiated, a - auto play'},
        {name: 'br_sound',     description: 'o - sound on, f - sound off'},
        {name: 'br_comp',      description: 'csv list of companion ads. 0 if none', source: "Default"},
        {name: 'br_comptype',  description: 's - static, h - html, i - iframe, n - none'},
        {name: 'br_pageurl',   description: 'url of the current page', source: 'location.href'},
        {name: 'br_conurl',    description: 'video url'},
        {name: 'br_contype',   description: 'v - video, g - game, m - music, a - application, t - text, o - other, u - unknown', source: "Default"},
        {name: 'br_embeddable',description: 'Shown in an embeddable player?', source: 'Default'},
        {name: 'br_concat',    description: 'Content Category'},
        {name: 'br_pagecat',   description: 'Page Category'},
        {name: 'br_seccat',    description: 'Section Category'},
        {name: 'br_sitecat',   description: 'Site Category'},
        {name: 'br_medrate',   description: 'Media rating. a - all, o - over 12, m - mature'},
        {name: 'br_privpol',   description: 'Site has a privacy policy', source: 'Default'},
        {name: 'br_conlen',    description: 'Length of video in seconds'},
        {name: 'br_conid',     description: 'Content Id'},
        {name: 'br_conkw',     description: 'Content Keywords', source: '<meta> keywords'},
        {name: 'br_srchkw',    description: 'Search Keywords', source: '"q" in referrer or current url'},
        {name: 'br_skip',      description: 'skippable - y, n, u', source: 'Default'},
        {name: 'br_skipoffset',description: 'seconds after which skip appears'},
        {name: 'br_pubname',   description: 'publisher name'},
        {name: 'br_pubdomain', description: 'publisher domain', source: "location.hostname"},
        {name: 'br_connm',     description: 'Title of the video content'},
        {name: 'br_pagenm',    description: 'Page Title', source: "document.title"},
        {name: 'br_demgen',    description: 'Gender of the user'},
        {name: 'br_propnm',    description: 'Age of user'},
        {name: 'br_propid',    description: 'property name'},
        {name: 'br_stddelay',  description: 'number of seconds into the content the ad displayed'},
        {name: 'br_medbitr',   description: 'bitrate'},
        {name: 'br_medfing',   description: 'fingerprint id of the content'},
        {name: 'br_appver',    description: 'version of the app'},
        {name: 'br_condes',    description: 'description of the current page/video content', source: '<meta> description'},
        {name: 'br_refurl',    description: 'url of the previous page', source: "document.referrer"},
        {name: 'br_conlang',   description: 'language of the content', source: "browser language"},
        {name: 'br_custom',    description: ''}
    ];

    // Fill in values
    var urlGen = new window.VASTUrlGenerator();
    for (var i = 0; i < $scope.results.length; i++) {
        $scope.results[i].value = urlGen.val($scope.results[i].name);
    }

    $scope.baseUrl = "http://vast.bp3850441.btrll.com/vast/3844778";
    $scope.queryString = urlGen.query();

    $scope.fetchVast = function() {
        $scope.vastUrl = $scope.baseUrl + $scope.queryString;
    };
};

window.angular.module('vug', ['filters']);
window.angular.module('filters', []).
    filter('truncate', function () {
        return function (text, length) {
            if (typeof text != "string") {
                text = "" + text;
            }

            if (text.length <= length) {
                return text;
            } else {
                return text.substring(0, length) + '...';
            }

        };
    });

