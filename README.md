# CRUD API

https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md

## Init project

To init project: `npm i`

## Build project

To get build: `npm run build`

## Start dev server

To start dev mode: `npm run start:dev`
PORT: 4000

## Start prod server

To start prod mode: `npm run start:prod`

## Start load balancer mode

To start prod mode: `npm run start:multi`

## Supported endpoints

- GET api/users is used to get all persons

- POST api/users is used to create record about new user and store it in database

  expected payload is

  ```
  {
      "username": "test-username",
      "age": "test-age",
      "hobbies": [
          "test-hobby"
      ]
  }
  ```

- PUT api/users/{userId} is used to update existing user

  expected payload is

  ```
  {
      "username": "test-username",
      "age": "test-age",
      "hobbies": [
          "test-hobby"
      ]
  }
  ```

- DELETE api/users/{userId} is used to delete existing user from database

## Tests

- step1 - start project: `npm run start:dev`
- step 2 - run tests: `npm test`
