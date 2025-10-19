FROM node:20-alpine

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

EXPOSE 8000
# ใช้คำสั่ง dev (nodemon)
CMD ["npm", "run", "dev"]