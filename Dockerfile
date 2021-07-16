# stage1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod
# # stage2
# FROM nginx:alpine
# COPY --from=node /app/dist/Cimrpoc /usr/share/nginx/html

FROM registry.access.redhat.com/ubi8/nodejs-12
COPY . .
RUN npm install -g @angular/cli
CMD ng serve --host 0.0.0.0 --port 7000
