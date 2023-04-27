FROM node

WORKDIR /mycleanroom/server

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm","start"]