import { createUsersTable, createIncidentTable } from './tables.queries';
import db from './db';

const createAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othernames, username, phoneNumber, email, isAdmin, registered, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: ['Adesoji', 'Daniel', 'Oluwagbogo', 'Superman', '09011111111', 'sojiman@gmail.com', 'True', 'NOW', 'admin1234'],
});



async function createAllTables() {
  await db.query(createUsersTable());
  await db.query(createIncidentTable());
  await db.query(createAdmin())
}

createAllTables()
  .then(() => console.log('tables created'))
  .catch(err => console.log(err));
