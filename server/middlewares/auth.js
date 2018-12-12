import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/user.db';
import { getById, status } from '../db/controller.queries';


dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(403).json({
          status: 403,
          message: 'no access',
        });
      } else {
        req.data = data;
        next();
      }
    });
  } else {
    res.status(403).json({
      status: 403,
      error: 'you need access',
    });
  }
};

async function isAdmin(req, res, next) {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [req.data],
  };

  try {
    const { rows } = await db.query(query);
    if (!rows.length) {
      return res.status(404).json({
        status: 404,
        error: 'This is not user',
      });
    }

    if (!rows[0].isadmin) {
      return res.status(401).json({
        status: 401,
        error: 'This user is not an Admin',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error,
      error: 'Server error! Try again soon',
    });
  }
}

const validateRoute = (req, res, next) => {
  let type = req.path.split(['/']);

  if (type[1] === 'red-flags') {
    type = 'red-flag';
  }

  if (type[1] === 'interventions') {
    type = 'intervention';
  }

  if (type[1] === 'incidents') {
    type = 'incidents';
  }

  if (typeof type === 'object') {
    return res.status(400).json({
      status: 400,
      error: 'Oops! did you mean red-flags or interventions. Check the spelling',
    });
  }

  req.type = type;
  next();
};

async function isPresent(req, res, next) {
  const { rows } = await db.query(getById(req.type, req.params.id));
  if (!rows.length) {
    return res.status(404).json({
      status: 404,
      error: 'oops! Nothing found. Check the type of record or the id',
    });
  }

  if (rows[0].type !== req.type) {
    return res.status(400).json({
      status: 400,
      error: 'please use the right route',
    });
  }

  req.info = rows;
  next();
}

async function checkStatus(req, res, next) {
  const { rows } = await db.query(status(req.params.id));

  if (!rows.length) {
    return res.status(404).json({
      status: 404,
      error: 'no such record',
    });
  }
  if (rows[0].type !== req.type) {
    return res.status(400).json({
      status: 400,
      error: `please use the right route: ${rows[0].type}s/:id`,
    });
  }

  if (rows[0].createdby !== parseFloat(req.data)) {
    return res.status(401).json({
      status: 401,
      error: 'user does not own this record',
    });
  }

  if (rows[0].status !== 'draft') {
    return res.status(409).json({
      status: 409,
      error: `this report is ${rows[0].status}`,
    });
  }


  req.info = rows;
  next();
}


module.exports = {
  verifyToken,
  isAdmin,
  isPresent,
  checkStatus,
  validateRoute,
};
