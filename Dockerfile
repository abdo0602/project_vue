FROM node:18.13-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3434
CMD [ "http-server", "dist" ]
