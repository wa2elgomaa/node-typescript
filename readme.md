# Github Search Application

This application for searching github data bases on inputs from React application.
 
 This application is using the following technologies : 
  - NodeJS
  - Typescript 
  - ExpressJs
  - REDIS
  - Yarn - PKG control 
 
# Project Structure 

```
SERVER
│   README.md
│   package.json    
│   tsconfig.json    
│   tslint.json    
└───src
│   app.ts
│   server.ts
│   └───clients
│       └───redis
│           │   client.ts
│           │   redisCRUD.ts
│    └───configs
│        │   app.config.ts
│        │   constants.urls.ts
│    └───models
│        │   FetchResponse.d.ts
│        │   GitHubInput.d.ts
│        │   ItemEntity.d.ts
│        │   ServerResponse.d.ts
│    └───routes
│        │   index.ts
│    └───services
│        │   index.ts
│    └───utils
│        │   dataMapper.ts
```

### Solution Decisions 

* Created clients folder for DB clients, for the future decisions to change the db client and only the wrapper will be implemented. 
* Utilities/ Datamapping class to clean the data from github according to the client expectation and unification of server data response.
* Using es6 promisies and changed redis APIs with promisify for more control and clean code. 
* Using Yarn package manager instead of npm.
* Using Swagger documentation to document the API usage and examples. You can view the swagger documentation from http://localhost:3001/api-docs 

### Installation

To start using the application follow the below steps: 

Clone the repo using the following command : 

```sh
$ git clone  <repo URL> 
$ cd server
```

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
```

To Start the application, the application will start with 3001 port, if you want to change it use the ENV parameter

```sh
$ yarn start
```

The application is using port 3001. 
