FROM node:21.1.0

WORKDIR /app

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run" ,"dev"]