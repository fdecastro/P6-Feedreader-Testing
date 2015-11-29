/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/*
 * All tests are placed within the $() function, to make
 * sure that they don't run until the DOM is ready.
 */
$(function() {
    /*
     * This the first test suite.
     * This suite contains 3 tests about the RSS feeds.
     */
    describe('RSS Feeds', function() {
        /*
         * This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
         * This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is valid and not empty.
         */
        it('URLs are defined and not empty', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(ValidURL(allFeeds[feed].url)).toBe(true);
            };
        });

        /*
         * This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('Names are defined and not empty', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).not.toBe("");
            };
        });
    });

    /*
     * This second test suite contains the tests for the Menu.
     * and a test to validate if the menu is visible when the menu icon is clicked
     * and whether it hides when clicked again.
     */
    describe('The Menu', function() {

        /*
         * This test ensures that the menu element is hidden by default,
         * The test uses jQuery to select the menu element in the DOM that has the menu-hidden class.
         */
        it('element is hidden by default', function() {
            var isHidden = $('.menu-hidden');
            expect(isHidden.length > 0).toBe(true);
        });


        var menu = new Menu();
        beforeAll(function (done){
            menu.toggleMenuClass(function () {
                menu.toggleMenuClass( function (){
                    done();
                });
            });
        });

        /*
         * This test ensures the menu changes visibility when the menu icon is clicked.
         * It test that the menu display when clicked and does hides when clicked again.
         * It uses the function toggleMenuClass, called beforeAll.
         */
        it('displays and hides when menu icon is clicked', function(done) {

            if (menu.toggleComplete) {
                expect(menu.menuIsVisible).toBe(true);
                expect(menu.menuIsNotVisible).toBe(true);
            }
            done();

        });
    });

    /*
     * This third test suite contains a test for the loadFeed function.
     * It ensures that when called, it completes its work and there is at least a single entry
     * element within the feed container.
     */
    describe('Initial Entries', function() {

        var entryLinks;
        beforeEach(function (done){
            loadFeed(0, function () {
                entryLinks = $('.entry-link');
                //console.log(entryLinks);
                done();
            });
        });

        /*
         * Test that checks if the loadFeed function completed its work
         * and there is at least a single .entry element within the .feed container.
         */
        it('from loadFeed where uploaded', function(done) {
            expect(entryLinks.length > 0).toBe(true);
            done();
        });
    });

    /*
     * This fourth test suite contains a tests for when loadFeed function is reloading.
     * It ensures that when a new feed is loaded that the content actually changes.
     */
    describe('New Feed Selection', function() {

        var secondEntryLinks;
        var firstEntryLinks;
        beforeEach(function (done){
            loadFeed(0, function () {
                firstEntryLinks = $('.entry-link');
                loadFeed(1, function () {
                    secondEntryLinks = $('.entry-link');
                    done();
                });
            });
        });

        /*
         * This test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */
        it('changes contend in feed container when a new feed is selected', function(done) {
            //console.log('Second: ',secondEntryLinks[0].innerText);
            //console.log('First: ',firstEntryLinks[0].innerText);
            expect(firstEntryLinks[0].innerText != secondEntryLinks[0].innerText).toBe(true);
            loadFeed(0);
            done();
        });
    });

}());

/**
 * @desc ValidURL checks if a string has the corresponding characters of a valid URL
 * @param str is the string with the URL to be validated
 * @return boolean - true if the string is an URL
 */
function ValidURL(str) {
    "use strict";
    // regex is a regular expression for URL validation. Courtesy of: Diego Perini (https://gist.github.com/dperini/729294)
    var regex = new RegExp(
        "^" +
            // protocol identifier
        "(?:(?:https?|ftp)://)" +
            // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
            // IP address exclusion
            // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
            // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
            // TLD may end with dot
        "\\.?" +
        ")" +
            // port number
        "(?::\\d{2,5})?" +
            // resource path
        "(?:[/?#]\\S*)?" +
        "$", "i"
    );
    return regex.test(str);
}

// This menu object serves to register the various states of the menu object in the DOM.
function Menu() {
    this.toggleComplete = false;
    this.menuIsVisible = null;
    this.menuIsNotVisible = null;
}

// The toggleMenuClass method will simulate a click of the menu icon and
// it saves the results on the menu object for the Menu Test suite validation.
Menu.prototype.toggleMenuClass = function(cb) {
    var self = this;
    $('body').toggleClass('menu-hidden');

    var trans = $('.menu').css("transition");
    var number = trans.match(/\d+\.?/g);
    number = number[0]+number[1];
    var delay = number * 1000;

    setTimeout(function () {
        self.toggleComplete = true;
        var menuLeftPos = $('.menu').position().left;
        if (menuLeftPos < 0) {
            self.menuIsNotVisible = true;
        } else {
            self.menuIsVisible = true;
        }
        if (cb) {
            return cb();
        }
    }, delay);
};

