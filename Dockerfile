FROM node:20.11.1-alpine AS build

WORKDIR /schedule-management-client

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:latest AS run

LABEL maintainer="Miłosz Gilga <personal@miloszgilga.pl>"

COPY --from=build /schedule-management-client/dist /usr/share/nginx/html
COPY --from=build /schedule-management-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80