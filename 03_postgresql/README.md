WORKFLOW:

Neon - Drizzle
[text](https://neon.com/docs/guides/drizzle)

1. Create the server with Express (server.js)
2. Create the Environment Variables (.env with the DATABASE_URL from Neon)
3. Choose the ORM - Object Relational Mapper (in this case Drizzle ORM) [text](https://neon.com/docs/guides/drizzle#install-drizzle-and-a-driver)
4. Set the ORM up (drizzle.config.js and db.js) [text](https://neon.com/docs/guides/drizzle#configure-drizzle-kit)
5. Create the Database Schema (schema.js) [text](https://neon.com/docs/guides/drizzle#create-a-schema)
6. Generate the Migration Files (npx drizzle-kit generate) [text](https://neon.com/docs/guides/drizzle#generate-migrations)
7. Apply the generated migrations (SQL files) to the Neon DB [text](https://neon.com/docs/guides/drizzle#apply-migrations)
