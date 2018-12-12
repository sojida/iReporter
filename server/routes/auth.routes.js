import express from 'express';
import {
  validateUser,
  validateLogin,
  isUserPresent,
  checkDetails,
} from '../middlewares/validateUser';
import user from '../controllers/users.controller';


const router = express.Router();


// User sign up
router.post('/signup', validateUser, isUserPresent, user.registerUser);

// user login
router.post('/login', validateLogin, checkDetails, user.loginUser);

export default router;
