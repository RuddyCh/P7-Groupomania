## Groupomania P7 Backend

Ceci est le Backend du projet Groupomania

### Technologies utilisées

- Node.js, Express, JWT, Multer
- MySQL hébergé sur Planetscale
- ORM Prisma

### Comment utiliser

1. 'git clone' this repo
2. 'npm install'
3. Rename the ".env development" file into ".env"
4. This repo was tested with an online Planetscale MySQL database

### How to use Prisma to interact with the DB

The DB schema is inside 'schema.prisma'

If you want to change it, you have to run 'npx prisma db push'