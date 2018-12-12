import { createUsersTable, createIncidentTable } from './queries';
import db from './user.db';

async function createAllTables() {
    await db.query(createUsersTable());
    await db.query(createIncidentTable());
}

createAllTables()
    .then(() => console.log('tables created'))
    .catch((err) => console.log(err));

