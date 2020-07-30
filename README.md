


### Background ###

This is a basic Node JS Auth service used to authenticate users and different services. This services incorporates bicrypt and hashing to encrypt, authenticate and issue a self signed JWT token to different systems for authentication and authorization purposes. 

### Config ###

* Install MongoDB and start MongoDB locally
* Install nodemon  `npm i nodemon -g`
* `cd /auth` or the main directory and run `npm i` to install all required packages.

### Run ###

* `nodemon .` 

### APIs ###

## Create user ##
* URL: `http://localhost:3000/api/v1/auth/createUser`
* Body: `{
	"name": "Test2",
    "email":"test11@gmail.com",
    "password": "testtttt"
}
`
* Response: JWT token

## Login user ##
* URL: `http://localhost:3000/api/v1/auth/login`
* Body: `{
	"username": "test11@gmail.edu",
    "password": "testtttt"
}
`
* Response: JWT token

