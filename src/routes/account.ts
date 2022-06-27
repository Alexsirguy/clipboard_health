import express from 'express';
import { body } from 'express-validator';
import AccountController from '../controllers/account';
import { preControllerBodyValidation } from '../middlewares/Error';

const AccountRoute = express.Router();

AccountRoute.post(
  '/login',
  [
    body('username').isAlphanumeric().withMessage('Only alpha numeric characters are allowed for username.'),
    body('password').isLength({ min: 5 }).isString()
      .withMessage('Password must be at least 5 characters long and must be a string'),
  ],
  preControllerBodyValidation,
  AccountController.login,
);

AccountRoute.post(
  '/register',
  [
    body('username').isAlphanumeric().withMessage('Only alpha numeric characters are allowed for username.'),
    body('password').isLength({ min: 5 }).isString()
      .withMessage('Password must be at least 5 characters long and must be a string'),
    body('name').isString().isLength({ min: 5 }).withMessage('Name must be at least 5 characters long and must be a string'),
  ],
  preControllerBodyValidation,
  AccountController.register,
);

export default AccountRoute;
