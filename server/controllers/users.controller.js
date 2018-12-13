import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../db/db';
import { createUser } from '../db/controller.queries';

dotenv.config();

async function registerUser(req, res) {
  const password = bcrypt.hashSync(req.body.password, 10);

  const { rows } = await db.query(createUser(req.body.firstname, req.body.lastname, req.body.othernames, req.body.username, req.body.phoneNumber, req.body.email, req.body.isadmin, 'now', password));
  const token = jwt.sign(rows[0].id, process.env.JWT_SECRET);

  delete rows[0].password;
  res.status(201).json({
    status: 201,
    data: [{
      token,
      user: rows[0],
      message: 'Sign up succesful',
    }],
  });
}


async function loginUser(req, res) {
  delete req.user.password;

  res.status(200).json({
    status: 200,
    data: [{
      token: req.token,
      user: req.user,
      message: 'Sign in succesful',
    }],
  });
}


module.exports = { registerUser, loginUser };
