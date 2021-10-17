FROM node:10-alpine
WORKDIR /usr/app
RUN chown -R node:node /usr/app
USER node
COPY ./yarn.lock ./
COPY ./package.json ./
COPY ./dist/api.min.js ./
RUN yarn install --production=true
CMD ["node", "/usr/app/api.min.js"]
