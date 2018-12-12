import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { checkUser } from '../db/controller.queries';
import db from '../db/user.db';


dotenv.config();


const { emailPattern } = {
  emailPattern: /^[a-z\d]+@[a-z]+\.(com|co)[\.a-z]+$/,
};

const validateUser = (req, res, next) => {
  let verified = true;
  const errors = [];

  const {
    firstname, lastname, othernames, email, phoneNumber, username, password, password2,
  } = req.body;

  if (!firstname) {
    verified = false;
    errors.push({ firstname: 'firstname must be present' });
  }

  if (!lastname) {
    verified = false;
    errors.push({ lastname: 'lastname must be present' });
  }

  if (!othernames) {
    verified = false;
    errors.push({ othernames: 'othernames must be present' });
  }

  if (!(emailPattern.test(email))) {
    verified = false;
    errors.push({ email: 'email must be valid format: yorname@mail.com' });
  }

  if (!(/^[\d]{11}$/.test(phoneNumber))) {
    verified = false;
    errors.push({ phoneNumber: 'phone number must be valid' });
  }

  if (!username) {
    verified = false;
    errors.push({ username: 'please insert a username' });
  }

  if (!(/^[\w@-]{8,20}$/.test(password))) {
    verified = false;
    errors.push({ password: 'password can have uppercase, lowercase, numbers, "@" and "-" ' });
  }

  if (password !== password2) {
    verified = false;
    errors.push({ password: 'password do not match' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  let verified = true;
  const errors = [];

  const { email, password } = req.body;

  if (!email) {
    verified = false;
    errors.push({ email: 'email is required' });
  }

  if (email) {
    if (!(emailPattern.test(email))) {
      verified = false;
      errors.push({ email: 'email must be valid format: yorname@mail.com' });
    }
  }


  if (!password) {
    verified = false;
    errors.push({ password: 'password is required' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      errors,
    });
  }

  next();
};


async function isUserPresent(req, res, next) {
  const { rows } = await db.query(checkUser(req.body.email, req.body.username));

  if (rows.length) {
    if (rows[0].email === req.body.email) {
      return res.status(400).json({
        status: 400,
        error: 'That email has already been used',
      });
    }

    if (rows[0].username === req.body.username) {
      return res.status(400).json({
        status: 400,
        error: 'That username has already been used',
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

  const { rows } = await db.query(query);

  if (!rows.length) {
    return res.status(400).json({
      status: 400,
      error: 'invalid details',
    });
  }

  const pass = bcrypt.compareSync(req.body.password, rows[0].password);

  if (!pass) {
    return res.status(400).json({
      status: 400,
      error: 'invalid details',
    });
  }

  if (rows.length) {
    token = jwt.sign(rows[0].id, process.env.JWT_SECRET);
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
