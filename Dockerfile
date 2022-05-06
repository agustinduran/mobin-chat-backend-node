# Set the base image
FROM node:16

# Create app directory inside image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# apt-get install nano (optional)
RUN apt-get update && apt-get install -y curl && apt-get install nano

RUN npm install
RUN npm install -g npm@8.5.4

# Fix vulnerabilities on npm
RUN npm audit fix

# Bundle app source
COPY . .

# Expose port access app
EXPOSE 8080

CMD [ "node", "src/index.js" ]