FROM node

WORKDIR /mycleanroom/backend

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm","start"]