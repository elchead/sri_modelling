FROM ubuntu

WORKDIR /usr/src/app

COPY /node/package*.json ./

RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
RUN apt-get install -y nodejs
RUN npm install
COPY . .
WORKDIR /usr/src/app/node
COPY /node/package*.json ./
EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]