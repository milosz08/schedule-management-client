![](.github/banner.png)

# Schedule Management Client

[[Docker image](https://hub.docker.com/r/milosz08/schedule-management-client)] |
[[About project](https://miloszgilga.pl/project/schedule-management-system)]

Schedule management client. Written using Angular (at beginning using version 13, recently updated to 17). Web UI
interface for [ASP.NET WebAPI](https://github.com/milosz08/schedule-management-server) project.

## Table of content

* [Clone and run](#clone-and-run)
* [Prepare development environment](#prepare-development-environment)
* [Tech stack](#tech-stack)
* [Author](#author)
* [License](#license)

## Clone and run

1. Clone repository on your local machine via:

```bash
git clone https://github.com/milosz08/schedule-management-client
```

2. Prepare and run necessary docker containers with rest API application (more you find
   [here](https://github.com/milosz08/schedule-management-server)).

3. Create `.env` file and fill up environment variables based on `example.env` file:

```properties
SCHEDULE_DEV_CLIENT_PORT=7696
```

4. Run with Docker via:

```bash
$ docker compose up -d
```

Following command should create `schedule-management-client` container:

| Name                             | Port | Link                                    |
|----------------------------------|------|-----------------------------------------|
| schedule-management-client       | 7696 | [localhost:7696](http://localhost:7696) |

Make sure, that other containers from [api](https://github.com/milosz08/schedule-management-server) works as well:

| Name                             | Port(s)         | Link                                    |
|----------------------------------|-----------------|-----------------------------------------|
| schedule-management-mysql-db     | 7690            | [localhost:7690](http://localhost:7690) |
| schedule-management-mailhog-smtp | 7691, 7692 (UI) | [localhost:7692](http://localhost:7692) |
| schedule-management-minio-s3     | 7693, 7694 (UI) | [localhost:7694](http://localhost:7694) |
| schedule-management-api          | 7695            | [localhost:7695](http://localhost:7695) |

## Prepare development environment

1. Make sure you have Node v20 and npm with yarn. If you do not have yarn, install it via `$ npm i -g yarn`.
2. Install all dependencies via:

```bash
$ yarn install --frozen-lockfile
```

3. Run angular development server via:

```bash
$ yarn run start
```

Application will be listening on [localhost:7696](http://localhost:7696).

## Tech stack

* Angular 17,
* RxJS,
* Docker and Docker compose.

## Author

Created by Miłosz Gilga. If you have any questions about this application, send
message: [miloszgilga@gmail.com](mailto:miloszgilga@gmail.com).

## License

This project is licensed under the Apache 2.0 License.
