import { createUsersTable, createIncidentTable } from './tables.queries';
import db from './db';

async function createAllTables() {
  await db.query(createUsersTable());
  await db.query(createIncidentTable());
}

createAllTables()
  .then(() => console.log('tables created'))
  .catch(err => console.log(err));
