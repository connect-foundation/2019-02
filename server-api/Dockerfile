FROM node:10.16.0

RUN mkdir -p /home/dropy-api
RUN npm install -g pm2
COPY . /home/dropy-api
WORKDIR /home/dropy-api
RUN yarn install
CMD ["pm2-docker", "src/index.js"]

EXPOSE 4000
