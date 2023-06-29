FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

RUN cd client && yarn && yarn build && rm -rf node_modules

EXPOSE 8000

CMD ["node", "server.js"]