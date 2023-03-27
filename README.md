# Schedule Management System (Frontend)
[![Generic badge](https://img.shields.io/badge/Made%20with-Angular%20Framework%2013.3.0-1abc9c.svg)](https://angular.io/)&nbsp;&nbsp;
[![Generic badge](https://img.shields.io/badge/Build%20with-Angular%20CLI-green.svg)](https://angular.io/cli)&nbsp;&nbsp;
[![Generic badge](https://img.shields.io/badge/Packaging-Webpack%20with%20babel%20-brown.svg)](https://webpack.js.org/)&nbsp;&nbsp;
<br><br>
The aim of this project is to simulate a schedule management system for an example technical university. The application is divided into several main modules: admin panel module, schedule editor module and public module. The project was created as part of the credit for the course "Object Oriented Programming" during the pursuit of an engineering degree in Computer Science. <br>

See live application at: [schedule.miloszgilga.pl](https://schedule.miloszgilga.pl)<br>
See backend (server layer): [Schedule Management Server](https://github.com/Milosz08/schedule-management-server)

## Technology stack
-  Front-end layer:
    - [Angular Framework](https://angular.io/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [RXJS (Reactive JS)](https://rxjs.dev/)
    - [NGRX (Flux store)](https://ngrx.io/)
-  Back-end layer:
    - [ASP.NET Web API](https://dotnet.microsoft.com/en-us/apps/aspnet)
    - [Entity Framework](https://docs.microsoft.com/pl-pl/ef/)
    - [MySQL](https://www.mysql.com/)
    - [SSH.NET](https://github.com/sshnet/SSH.NET)
- Other services:     
    - [JWT (JSON Web Token)](https://jwt.io/)
    - [OAuth2 (JWT Assertion)](https://oauth.net/2/)
    - [Docker](https://www.docker.com/)

## Clone and run

- To install the program on your computer use the command (or use the built-in GIT system in your IDE environment):
```
$ git clone https://github.com/Milosz08/schedule-management-client
```
- Install all npm dependencies:
```
$ npm install
```
- Run on your local machine (where `portNumber` is for example 8383):
```
$ ng serve --port [portNumber]
```

> If the server program is not running, the client will run but will not download data. It is recommended to run both applications in a single execution environment, such as Docker Container.
