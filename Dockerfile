

FROM node:7.4.0

RUN apt-get update \
  && apt-get install -y postgresql postgresql-contrib \
  && apt-get install sudo \
  && apt-get install curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD [ "sudo", "service", "postgresql", "start" ]

CMD [ "npm", "start" ]
