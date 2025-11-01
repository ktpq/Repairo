FROM node:20-alpine

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

EXPOSE 3000
# ใช้คำสั่ง dev (nodemon)
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]