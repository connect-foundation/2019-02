FROM nginx:1.16.1

RUN mkdir -p /home/dropy
COPY ./build /home/dropy
COPY ./nginx.conf /etc/nginx/conf.d/vhosts.conf

EXPOSE 80
