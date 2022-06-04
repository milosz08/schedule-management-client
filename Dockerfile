FROM node:latest as node
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /app/dist/angular-po-schedule-management-client /usr/share/nginx/html

EXPOSE 8383
ENTRYPOINT [ "npm", "start" ]
