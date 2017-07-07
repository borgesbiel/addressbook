# Technical details

- Nodejs v6.11.0 and MongoDB v3.4.5

- Use JSON Web Token for session handling.

- Passwords are hashed using Bcrypt hashing algorithm.

- Basic Authentication for login authentication.

- Use ES6 syntax and Promises instead of callbacks.

- ES6 Features used: Promises, Arrow functions const identifier instead of var

## Package dependencies

- bcyptjs: Use to create and verify password hash using bcrpyt hasing algorithm.

- body-parser: This is used to parse the JSON body in each request.

- chai: Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

- express: This is the complete framework used to create RESTful web services.

- firebase: Provides the tools and infrastructure you need to develop, grow, and earn money from your app.

- firebase-admin: The Firebase Admin Node.js SDK provides admin (second-party) access to several Firebase services.

- jsonwebtoken: This is used to create JSON Web Token which is used for session handling.

- mongoose: This module is used to connect to MongoDB database.

- morgan: This module is used to print logs in terminal for each http request.

- mocha: Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser.

- nodemon: Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

## Functions

### login

- Authenticates the user and returns a JSON Web Token or else it throws a error.
- Returns a jwt token (expires in 1 hour) to be used when adding a new contact

### users register

- Saves data to MongoDB database. Instead of using the default Javascript callbacks we are using ES6 Promises. When creating a Promise we call resolve() for success operation and reject() for failure operation. Similarly when calling a promise then() is called for success and catch() is called for failure. Also, i have replaced function definition with ES6 Arrow functions.

### contacts register

- Validate if the user token is valid and then saves the contact to Firebase.

## routes.js

- All the RESTful endpoints are defined in routes.js file using the new Express 4 router.
- POST /authenticate endpoint is used for login operation.
- POST request in /users endpoint is used to add a new user.
- POST request in /contacts endpoint is used to add a new contact to Firebase.

## app.js

- Uses middle ware body-parser and morgan with Express.
- Appends /api/v1/ to every endpoint.
- Server will run on http://127.0.0.1:8080.

# Running guide

## Install prerequisites

- Node.js (https://nodejs.org)
- npm (https://www.npmjs.com/)
- MongoDB (https://www.mongodb.com/download-center)

## Create MongoDB Database

- install dependencies: `npm install`
- run mongodb: `mongod`
- run MongoDB shell: `mongo`
- create database: `use Strvdb`
- Make the email field as unique (similar to primary key in Relational database such as MySQL): `db.getCollection('users').createIndex( { "email": 1 }, { unique: true } )`

## Running the app

**mongodb must be always running**

- run mongodb: `mongod`
- run with nodemon: `nodemon app`

# Tests

- run: `npm test ordered_tests`

# API calls

**Register User**
----
  Register a new user.

* **URL**

  /api/v1/users

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

    **JSON**
     `email=[string]`
     `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "User Registered Sucessfully !" }`

* **Error Response:**

  * **Code:** 409 <br />
    **Content:** `{ "message": "User Already Registered !" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ "message" : "Invalid Request !" }`

* **Sample Call:**

  ```
  curl -H "Content-Type: application/json" -d '{"email":"curl_user@gmail.com", "password": "abc123"}' https://strvtestaddressbook.herokuapp.com/api/v1/users
  ```

**Authenticate User**
----
  Authenticates (login) user and returns a security token.

* **URL**

  /api/v1/authenticate

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

    **JSON**

     `email=[string]`
     `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "User Authenticated Sucessfully !", "token": "token" }`

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "message": "User Not Found !" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ "message" : "Invalid Credentials !" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message" : "Internal Server Error !" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ "message" : "Invalid Request !" }`

* **Sample Call:**

  ```
  curl -H "Content-Type: application/json" -d '{"email":"curl_user@gmail.com", "password": "abc123"}' https://strvtestaddressbook.herokuapp.com/api/v1/authenticate
  ```

**Create New Contact**
----
  Add user contact to Firebase.

* **URL**

  /api/v1/contacts

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

    **JSON**

     `email=[string]`

    **Headers**

     `x-access-token=[token]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Contact Added Sucessfully !" }`

* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ "message": "Invalid Token !" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ "message" : "Invalid Request !" }`

* **Sample Call:**

  ```
  curl -H "Content-Type: application/json" -H "x-access-token: token" -d '{"email":"curl_contact@gmail.com"}' https://strvtestaddressbook.herokuapp.com/api/v1/contacts
  ```

# Firebase structure

```
  addressbook
	  users
	      mongo user id
			  contacts
				  firebase unique id
					  contact email
```

![alt text](https://image.ibb.co/cBc7Sv/Screen_Shot_2017_07_06_at_18_34_51.png)
