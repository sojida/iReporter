const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(40) NOT NULL,
          lastname VARCHAR(40) NOT NULL,
          othernames VARCHAR(40),
          email VARCHAR(40) UNIQUE NOT NULL,
          phonenumber VARCHAR(40),
          username VARCHAR(40) UNIQUE NOT NULL,
          registered TIMESTAMP,
          password VARCHAR(100),
          isadmin BOOLEAN 
          
        )`;
  return text;
};


const dropUsersTable = () => 'DROP TABLE IF EXISTS users';

const createIncidentTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
        incidents(
          id SERIAL PRIMARY KEY,
          createdon TIMESTAMP NOT NULL,
          createdby INTEGER,
          title VARCHAR(40) NOT NULL,
          type VARCHAR(40) NOT NULL,
          location VARCHAR(40) ,
          status VARCHAR(40) ,
          images bytea,
          videos bytea,
          comment TEXT,
          FOREIGN KEY (createdby) REFERENCES users (id) ON DELETE CASCADE
        )`;

  return text;
};

const dropIncidentTable = () => 'DROP TABLE IF EXISTS incidents';

const deleteUser = id => ({
  text: 'DELETE FROM users WHERE id = $1',
  values: [id],
});

const deleteIncidents = id => ({
  text: 'DELETE FROM incidents WHERE id = $1',
  values: [id],
});


module.exports = {
  createUsersTable,
  dropUsersTable,
  createIncidentTable,
  dropIncidentTable,
  deleteUser,
  deleteIncidents,
};
