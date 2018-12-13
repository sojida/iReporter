/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to db');
});


pool.on('remove', () => {
  console.log('removed from db');
});

function query(text, params, callback) {
  return pool.query(text, params, callback);
}

module.exports = { query };
