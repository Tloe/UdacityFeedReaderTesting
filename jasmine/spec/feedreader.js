/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test checks if feed.url is defined and that the length is not 0 (empty)
         */
        it('all feeds has .url defined and not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test checks if feed.name is defined and that the length is not 0 (empty)
         */
        it('all feeds has .name defined and not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });


    /* Test suit for testing of the slide in menu
     */
    describe('The Menu', function() {
        /* Checks if the menu is hidden by default.
         *
         * If the body has the class menu-hidden set it should be hidden and its absolutt x position should be less than 0
         */

        it('menu item is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').offset().left).toBeLessThan(0);
        });

         /* Checks if the menu changes visibility when the menu icon is clicked.
          *
          * When clicked it should be visible; The body should not have the menu-hidden class set
          *
          * When clicked again it should not be visible anymore; The body should have
          * the menu-hidden class set
          */
        it('menu icon click shows and hide menu', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test suit for testing the initial entries
     *
     */
    describe('Initial Entries', function() {
        /* Makes sure the asyncronus loadFeed function has completed populating the feed before any of the tests
         * in this test suit
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Checks that the feed is populated and has atleas one entry
         *
         * If the first child element is not null it has elements
         */
        it('atleas one entry in .feed container after loadFeed is done executing', function() {
            expect($('.feed')[0].firstElementChild).not.toBeNull();
        });
    });

    /*  Test suit for thesting news feed selection
     */
    describe('News Feed Selection', function() {
        let oldFeed;

        /* Makes sure the asyncronus loadFeed function has completed populating the feed two times before any of
         * the tests in this test suit. We also store the content of the first load of the feed so we have data
         * to test against.
         */
        beforeEach(function(done) {
            loadFeed(0, () => {
                oldFeed = $('.feed')[0].textContent;
                loadFeed(1, done);
            });
        });

        /* Checks if the content of the feed has changed
         */
        it('Content change on feed change', function() {
            let currentFeed = $('.feed')[0].textContent;
            expect(currentFeed).not.toBe(oldFeed);
        });
    });
}());


