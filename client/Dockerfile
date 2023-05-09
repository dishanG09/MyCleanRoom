FROM node as build-stage

WORKDIR /mycleanroom/frontend

COPY . ./

RUN npm install

RUN npm run build

# --- adding server ---

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /mycleanroom/frontend/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
