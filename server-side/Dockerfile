FROM node:12
WORKDIR /server-side
COPY package.json .
RUN npm install
COPY . .
CMD npm start