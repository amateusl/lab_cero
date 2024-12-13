import pg from 'pg';
import  { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from './config.js';

const { Pool } = pg;

export const pool = new Pool({
    user: DB_USER || 'postgres',
    host: DB_HOST || 'localhost',
    database: DB_DATABASE || 'lab_cero',
    password:'Leroi24',    
    port: DB_PORT || 5432,
});

