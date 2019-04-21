### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist

###RUN (sed "/ENVIRONMENT REPLACE/q" dist/index.html; cat docker/index-snippet.html; sed  "1,/ENVIRONMENT REPLACE/ d" dist/index.html) > dist/index.html

RUN sed -i -e "/ENVIRONMENT REPLACE/r docker/index-snippet.html" -e "s/.*ENVIRONMENT REPLACE.*//" dist/index.html

### STAGE 2: Setup ###

FROM nginx:stable

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

# users are not allowed to listen on priviliged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf
EXPOSE 8081

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

# entrypoint script
ADD ./docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html
