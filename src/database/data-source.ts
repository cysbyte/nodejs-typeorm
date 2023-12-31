import * as dotenv from 'dotenv';
import { query } from 'express';

import { DataSource } from 'typeorm';
import { Author } from '../entities/Author';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'db',
    logging: ['query'],
    synchronize: false,
    entities: [Author],
    subscribers: [],
    migrations: ['src/database/migrations/*.ts']
})