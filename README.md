initial

Week 5 Project: Code Snippet Organizer

While the full project description can be found here, this README should be a a useful tool in determining when to complete certain aspects of the project, especially if you find yourself often asking "Where do I start?". As it is just a tool, note that it's not required to follow the advice here, though it is strongly encouraged.

Monday - Organizing and Testing Express Apps

Tasks
1. Need to create tests.
2. Code for sessions. 
Create an express server with routes for the following functionality:
register as a new snippet user

login as an existing snippet user

list all of a user's snippets

see all of a user's snippets for a specific language

see all of a user's snippets for a specific tag

see a specific snippet

create a new snippet

create templates for your various routes:
a form to create a new snippet with appropriate fields

a template to list all snippets

a template to show a single snippet and allow it to be updated

write tests to assert that all of the above functionality works properly
Tips

the list of existing users should be kept in a global variable so that the server knows who is registered regardless of which browser is used

the currently logged in user should be kept in a session variable so that different users using different browsers can log in separately

dynamic routes will be helpful when showing snippets by language and tag, as well as showing a specific

Tuesday - Introduction to MongoDB

Tasks

update code which manages users to store those users in mongodb instead of memory (global variable):
every user has a username, password, and list of snippets

every snippet (within a user) has a title, body, maybe notes, language, and tags

update user registration and login to insert/read a user from mongodb -- you'll still want to track the logged-in user in a session

update tests to account for the fact that state is stored in mongodb rather than the server's memory.

Tips

remember that objects are a great way to model things with key-value pairs, and that arrays are a great way to model a list of similar things

while you could consider using multiple collections (one for users, one for snippets), life will be much easier if you store everything in a single collection of users, with each user having an array of snippets)

Wednesday - Mongoose Models

Tasks

instead of shoving POJOs (Plain Old JavaScript Objects) directly into mongodb, write a mongoose model for a user and update your code accordingly.

update your routes to use mongoose query methods instead of mongodb directly.

if you find yourself writing code to do the same thing over and over (e.g., grabbing a list of snippets by tag), consider writing instance methods for your model.

Tips

consider writing your model before you start updating your routes

it is not strictly necessary to write instance methods, so skip them if they confuse you

Thursday - Authentication with Passport

Tasks

Use Passport to store logged-in state instead of sessions
Tips

newline has a bunch of example code for encrypting passwords
