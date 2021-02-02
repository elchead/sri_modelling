FROM ubuntu

WORKDIR /usr/src/app

COPY /node/package*.json ./

RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
RUN apt-get install -y nodejs
RUN npm install
COPY node ./node/
COPY Population ./Population/
COPY CMakeLists.txt .
COPY config.json .
COPY main.cpp .
RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt install -y libeigen3-dev
RUN apt install -y build-essential
RUN apt install -y cmake
RUN mkdir build
WORKDIR /usr/src/app/build
RUN cmake ..
RUN cmake --build .
WORKDIR /usr/src/app/node
COPY /node/package*.json ./
EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]