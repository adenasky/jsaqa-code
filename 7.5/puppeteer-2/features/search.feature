Feature: qamid.tmweb.ru/client/index.php tests
    Scenario: Booking a single seat
        Given user has accessed the website
        When user selects a day to watch a movie
        When user selects the movie Mickey Mouse
        When user selects a seat
        When user clicks the book button
        Then page title contains tickets
        
    Scenario: Booking multiple available seats
        Given user has accessed the website
        When user selects a day to watch a movie
        When user selects the movie Stalker
        When user selects multiple seats
        When user clicks the book button
        Then list of booked seats contains 1/1, 1/2
        
    Scenario: Booking an occupied seat
        Given user has accessed the website
        When user selects a day to watch a movie
        When user selects the movie Witcher
        When user selects an occupied seat
        Then verify the book button is inactive