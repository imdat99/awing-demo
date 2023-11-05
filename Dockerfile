FROM node:16.17.1 as builder

WORKDIR /frontend
ARG ENV_FILE

ENV NODE_ENV production

COPY package.json .
COPY .env .

RUN yarn install --network-timeout 100000

COPY . .

# RUN echo "$ENV_FILE" > '.env'
# RUN echo "$ENV_FILE" > '.env.production'

RUN yarn build

FROM nginx:1.18-alpine as release

COPY ./conf.d/ /etc/nginx/conf.d/
COPY --from=builder /frontend/build/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]