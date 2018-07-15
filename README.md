# artGal
Art gallery web app that hosts MS Paint-like images.

# About
This web app allows users to sign in, create and post drawings, as well as comment on them.
This web app focuses on several concepts that are used in full scale web apps, and on top of simple CRUD actions, the web app
has features such as google sign-in integration and HTML5 canvas integration. 

# How to run
To run, first clone the repo to where you want to run the nodeJS code.
You will then want to create a .env file, with the following lines of code:
`
googleClientID=
googleClientSecret=
cookieKey=
`
Then fill in the env variables with keys that you generate for yourself.
This means getting a google sign-in client key: https://developers.google.com/identity/sign-in/web/sign-in.
The cookie key is an arbitrary string you can enter.
Note that you will also have to change the mongoDB link in appJS. I recommend changing it to a free mlabs account
that you can make.

To run simply type `npm start`, or to run the development version (one that live updates using nodemon) type `npm run r`
into your terminal.

# Concepts learned
This web app taught me an introduction to NoSQL databases, the MVC design pattern, CRUD operations, env variables, and some
HTML5 Canvas manipulation
