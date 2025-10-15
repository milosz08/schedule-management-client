# Schedule Management Client

Client for the ASP.NET Core schedule management API. Written with the Angular framework and RxJS.

[GitHub repository](https://github.com/milosz08/schedule-management-client)
| [Support](https://github.com/sponsors/milosz08)

## Build image

```bash
docker build -t milosz08/schedule-management-client .
```

## Create container

* Using command:

```bash
docker run -d \
  --name schedule-management-client \
  -p 7696:8080 \
  -e SCHEDULE_API_URL=<rest API path, Caddy reverse proxy> \
  milosz08/schedule-management-client:latest
```

* Using `docker-compose.yml` file:

```yaml
services:
  schedule-management-client:
    container_name: schedule-management-client
    image: milosz08/schedule-management-client:latest
    ports:
      - '7696:8080'
    environment:
      SCHEDULE_API_URL: <rest API path, Caddy reverse proxy>
    networks:
      - schedule-management-network

  # other containers...

networks:
  schedule-management-network:
    driver: bridge
```

> [!NOTE]
> The value for the `SCHEDULE_API_URL` environment variable depends on your Docker network configuration. If the
> `schedule-management-client` runs in the same network as the API (`schedule-management-api`), you should provide the
> service name as the URL: `http://schedule-management-api:8080`. However, if the client application is in a different
> Docker network but on the same host, you should connect via the host's exposed port by setting the variable to
> `http://host.docker.internal:7695`.

## Author

Created by Miłosz Gilga. If you have any questions about this application, send
message: [miloszgilga@gmail.com](mailto:miloszgilga@gmail.com).

## License

This project is licensed under the Apache 2.0 License.
