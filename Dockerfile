FROM node:11
WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH

COPY package.json ./
# COPY package-lock.json ./

RUN npm install -legacy-peer-deps --production
COPY . ./
RUN npm run build -legacy-peer-deps

# EXPOSE 3000
# ENTRYPOINT ["yarn", "start"]