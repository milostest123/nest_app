import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
       'src/entities/*.ts',
    ],
    migrations: [
       'src/migration/**/*.ts',
    ],
    subscribers: [
       'src/subscriber/**/*.ts',
    ],
    cli: {
       entitiesDir: 'src/app/models',
       migrationsDir: 'src/migration',
       subscribersDir: 'src/subscriber',
    },
 };