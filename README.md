This is the server side for the web application "Movie Club", a site for users
to create and store movie collections of their own design. The server was built with
JavaScript, Node, Express, and uses MongoDB and Mongoose for database storage.
The deployed site can be found here: https://fierce-forest-42234.herokuapp.com/

This server interacts with a client application I built with JavaScript, HTML5,
Bootstrap, and SCSS. The links to the repo and deployed site can be found here:
https://github.com/AidanKenney/MovieClub-client
https://aidankenney.github.io/MovieClub-client/

Because this was the first API I ever built myself, I planned to give mysefl plenty of
time for building working routes and testing curl scripts before getting
into the client side. The biggest problem I ran into was the need to alter my GET
route to only return collections that are owned by the requesting user. In order to
do this, I refactored a "requireOwnership" error function to return a boolean
value instead of throwing an error. With this, I could filter the database according
to the user's ID, and return only the ones that user had created. This experience
has greatly enriched my understanding of how websites work, and the thought
that goes into deciding whether a problem should be solved in the frontend or
backend.

In future versions of this project, I would like to include the ability to comment
on collections, and have the application work like a forum where different users
can share and learn from one another. As for the current state of the project,
I am satisfied with the way this API securely provides the client with data.


ERD: https://imgur.com/a/FqSrsVx
