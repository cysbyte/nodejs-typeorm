import * as dotenv from 'dotenv';

import app from './app';
import { AppDataSource } from './database/data-source';

dotenv.config();

AppDataSource
    .initialize()
    .then(() => {
        console.log('Database connection success.')
    })
    .catch(err => console.log(err));

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})