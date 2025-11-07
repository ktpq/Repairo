git clone https://github.com/ktpq/Repairo
cd Repairo
docker compose up -d 
docker exec -it repairo-backend sh -c "npx prisma migrate dev --name 'migrate'"