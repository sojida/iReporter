import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { checkUser } from '../db/controller.queries';
import db from '../db/db';


dotenv.config();


const { emailPattern } = {
  emailPattern: /^[a-z\d]+@[a-z]+\.(com|co)[\.a-z]+$/,
};

const validateUser = (req, res, next) => {
  let verified = true;
  const error = [];

  const {
    firstname, lastname, othernames, email, phoneNumber, username, password, password2,
  } = req.body;

  if (!firstname) {
    verified = false;
    error.push({ firstname: 'firstname must be present' });
  }

  if (!lastname) {
    verified = false;
    error.push({ lastname: 'lastname must be present' });
  }

  if (!othernames) {
    verified = false;
    error.push({ othernames: 'othernames must be present' });
  }

  if (!(emailPattern.test(email))) {
    verified = false;
    error.push({ email: 'email must be valid format: yorname@mail.com' });
  }

  if (!(/^[\d]{11}$/.test(phoneNumber))) {
    verified = false;
    error.push({ phoneNumber: 'phone number must be valid' });
  }

  if (!username) {
    verified = false;
    error.push({ username: 'please insert a username' });
  }

  if (!(/^[\w@-]{8,20}$/.test(password))) {
    verified = false;
    error.push({ password: 'password should be more than 8 characters and can have uppercase, lowercase, numbers, "@" and "-" ' });
  }

  if (password !== password2) {
    verified = false;
    error.push({ password2: 'password do not match' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  let verified = true;
  const error = [];

  const { email, password } = req.body;

  if (!email) {
    verified = false;
    error.push({ email: 'email is required' });
  }

  if (email) {
    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }
  }


  if (!password) {
    verified = false;
    error.push({ password: 'password is required' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }

  next();
};


async function isUserPresent(req, res, next) {
  const { rows } = await db.query(checkUser(
    req.body.email,
    req.body.username,
    req.body.phoneNumber,
  ));

  if (rows.length) {
    if (rows[0].email === req.body.email) {
      return res.status(409).json({
        status: 409,
        error: 'That email has already been used',
      });
    }

    if (rows[0].username === req.body.username) {
      return res.status(409).json({
        status: 409,
        error: 'That username has already been used',
      });
    }

    if (rows[0].phonenumber === req.body.phoneNumber) {
      return res.status(409).json({
        status: 409,
        error: 'That phonenumber has already been used',
      });
    }
  }


  next();
}


async function checkDetails(req, res, next) {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [req.body.email],
  };

  let token;
  let pass;

  const { rows } = await db.query(query);

  if (!rows.length) {
    return res.status(400).json({
      status: 400,
      error: 'invalid details',
    });
  }

  token = jwt.sign(rows[0].id, process.env.JWT_SECRET);
  if (rows[0].isadmin){
    pass = (req.body.password === rows[0].password)
  } else {
    pass = bcrypt.compareSync(req.body.password, rows[0].password);
  }

  if (!pass) {
    return res.status(400).json({
      status: 400,
      error: 'invalid details',
    });
  }

 
  


  req.token = token;
  req.user = rows[0];
  next();
}

module.exports = {
  validateUser,
  validateLogin,
  isUserPresent,
  checkDetails,
};
