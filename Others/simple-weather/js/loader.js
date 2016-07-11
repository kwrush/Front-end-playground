/**
 * A simple js loader
 */
 var loader = (function () {
    function _load (url) {
        return new Promise(function (resolve, reject) {
            var element = document.createElement('script');
            var parent = document.getElementsByTagName('body')[0];
            var attr = 'src';

            element.onload = function () {
                resolve(url);
            };

            element.onerror = function () {
                reject(url);
            };

            element.setAttribute('async', true);
            element.setAttribute(attr, url);
            parent.appendChild(element);
        });
    }

    function _run (urls, callback) {
        var sequence = Promise.resolve();
        urls.forEach(function (url) {
            sequence = sequence.then(function () {
                return _load(url);
            }).then(function () {
                callback();
            }).catch(function (url) {
                console.error('Failed to load files: ' + url);
            });
        });
    }

    return {
        load: _run
    };
})();
