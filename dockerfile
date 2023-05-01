# Stage 1: Building the app
FROM node:lts AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Running the app
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/front/build ./dist/front/build
COPY package*.json ./
COPY chat.sql ./dist
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]
