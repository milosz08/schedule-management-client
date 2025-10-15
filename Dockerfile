FROM node:20-alpine AS build

WORKDIR /schedule-management-client

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

FROM caddy:2.10

COPY --from=build /schedule-management-client/dist/browser /app
COPY /docker/Caddyfile /etc/caddy/Caddyfile

LABEL maintainer="Miłosz Gilga <miloszgilga@gmail.com>"

EXPOSE 8080
