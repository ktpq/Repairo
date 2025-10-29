1. docker compose up -d --build
2. docker exec -it repairo-backend sh -c "npx prisma migrate dev --name 'migrate'"