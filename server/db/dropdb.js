import { dropIncidentTable, dropUsersTable } from './queries';
import db from './user.db';

async function dropAllTables() {
    await db.query(dropIncidentTable());
    await db.query(dropUsersTable());
}

dropAllTables()
    .then(() => console.log('tables droped'))
    .catch((err) => console.log(err));
