const getAllIncidents = () => 'SELECT * FROM incidents';


const createRecord = (type, id, time = 'now', status = 'draft', comment, title, images, videos, location) => ({
  text: 'INSERT INTO incidents(type, createdby, createdon, status, comment, title, images, videos, location) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: [type, id, time, status, comment, title, images, videos, location],
});

const getRecord = type => ({
  text: 'SELECT * FROM incidents WHERE type = $1',
  values: [type],
});

const getById = (type, id) => ({
  text: 'SELECT * FROM incidents WHERE type = $1 AND id = $2',
  values: [type, id],
});

const updateProperty = (property, details, type, id) => ({
  text: `UPDATE incidents SET ${property} = $1 WHERE type = $2 AND id = $3 AND status = $4 RETURNING *`,
  values: [details, type, id, 'draft'],
});

const deleteRecord = (type, id, userId) => ({
  text: 'DELETE FROM incidents WHERE type = $1 AND id = $2 AND createdby = $3 RETURNING *',
  values: [type, id, userId],
});

const status = id => ({
  text: 'SELECT * FROM incidents WHERE id = $1',
  values: [id],
});

const updateStatus = (process, id) => ({
  text: 'UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *',
  values: [process, id],
});

const createUser = (firstname, lastname, othernames, username, phonenumber, email, isadmin, date = 'now', password) => ({
  text: 'INSERT INTO users(firstname, lastname, othernames, username, phoneNumber, email, isAdmin, registered, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: [firstname, lastname, othernames, username, phonenumber, email, 'false', date, password],
});

const checkUser = (email, username, phoneNumber) => ({
  text: 'SELECT * FROM users WHERE email = $1 OR username = $2 OR phonenumber = $3',
  values: [email, username, phoneNumber],
});

const myRecord = (id) => ({
  text: 'SELECT * FROM incidents WHERE createdby = $1',
  values: [id],
})

module.exports = {
  getAllIncidents,
  createRecord,
  getRecord,
  getById,
  updateProperty,
  deleteRecord,
  status,
  createUser,
  updateStatus,
  checkUser,
  myRecord,
};
