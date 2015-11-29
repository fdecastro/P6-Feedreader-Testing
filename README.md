# Project 6: Feed Reader Testing

*By: Felipe De Castro Veras.*   
Creation date: Nov 29, 2015.   

For project 6 of the Front-End Web Developer Course   
Deadline: Dec 14, 2015.  

For this project a fully functional web-based application that reads RSS feeds was provided.   
The original developer of this application clearly saw the value in testing, they've included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite.   
We have finished the original first test suit and added three more, to comply with the project requirements.

## The following where added in `feedreader.js` to the original application: 

1. A test was written that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
2. A test was written that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
3. A a new test suite named "The menu" was written.
4. A test was written that ensures the menu element is hidden by default.
5. A test was written that ensures the menu changes visibility when the menu icon is clicked. This test have two expectations: does the menu display when clicked and does it hide when clicked again.
6. A new test suite named "Initial Entries" was written. 
7. A test was written that ensures when the loadFeed function is called and completes its work, and there is at least a single `entry` element within the `feed container. 
8. A new test suite named "New Feed Selection" was written. 
9. A test was written that ensures when a new feed is loaded by the loadFeed function, the content actually changes. 
10. All tests have a green status.
