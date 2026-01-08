# FROM node:lts-alpine

# WORKDIR /app

# COPY package.json package.json

# RUN npm i
# RUN apk --update --no-cache add curl

# COPY app app

# # COPY tsconfig.json tsconfig.json
# # COPY tailwind.config.ts tailwind.config.ts
# # COPY postcss.config.js postcss.config.js
# # COPY codegen.ts codegen.ts

# # COPY next.config.mjs next.config.mjs 

# CMD npm run dev & npm run start

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# On utilise le mode dev pour avoir le rafraîchissement automatique
CMD ["npm", "run", "dev"]
