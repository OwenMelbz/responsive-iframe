/*
* Basic Responsive iFrames.
*
* They always take the width of their parent
* They need a block-like display property.
*
* Simples.
*
* Note: add .dont-resize to your iframe to bypass resizing
*/

(function(document){

    'use strict';

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    function forEachIframe(callback) {
        if (iframes.length > 0) {
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                if (iframe.className.indexOf('dont-resize') !== -1) {
                    iframes.splice(i, 1);
                } else {
                    callback(iframe);
                }
            }
            iframe = undefined;
        }
    }

    function resizeIframes() {
        forEachIframe(function(iframe) {
            var maxWidth = iframe.parentElement.getBoundingClientRect().width,
            ratio = iframe.height / iframe.width,
            height = maxWidth * ratio;
            iframe.style.height = height + 'px';
            iframe.style.width = '100%';
        });
    }

    var iframeDoms = document.getElementsByTagName('iframe'),
        iframes    = Array.prototype.slice.call( iframeDoms );

    window.onload = resizeIframes();
    window.onresize = debounce(resizeIframes, 100);

})(document);