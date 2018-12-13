import { dropIncidentTable, dropUsersTable } from './tables.queries';
import db from './db';



async function dropAllTables() {
  await db.query(dropIncidentTable());
  await db.query(dropUsersTable());
}

dropAllTables()
  .then(() => console.log('tables droped'))
  .catch(err => console.log(err));
