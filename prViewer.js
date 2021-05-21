// ==UserScript==
// @name         pr change viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  view some pr's
// @author       You
// @match        https://github.com/*/pull/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


var $ = window.jQuery;

var fileViewToggleElements = null;
var i = 0;

function reset() {
    fileViewToggleElements = $('[data-ga-click~="value:false"]');
    i = 0;
}

function markAsViewed() {
    fileViewToggleElements = fileViewToggleElements != null ? fileViewToggleElements : $('[data-ga-click~="value:false"]');

    if (i >= fileViewToggleElements.length) {
        reset();
        if (fileViewToggleElements.length == 0) {
            break;
        }
    }

    fileViewToggleElements[i].scrollIntoView();
    fileViewToggleElements[i].click();

    i++;
}

function KeyCheck(e) {
    if ($('div.write-content').hasClass('focused')) {
        return;
    }

    switch (e.code) {
        case 'Escape':
            reset();
            break;

        case 'Backquote':
            markAsViewed()
            break;

        default:
            break;
    }
}

(function() {
    'use strict';
    window.addEventListener('keydown', KeyCheck, true);
})();
