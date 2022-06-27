import express from 'express';
import { body, param } from 'express-validator';
import StaffController from '../controllers/staff';
import { preControllerBodyValidation } from '../middlewares/Error';

const StaffRoute = express.Router();

StaffRoute.post(
  '/',
  [
    body('name').isAlphanumeric().withMessage('Only alpha numeric characters are allowed for name.'),
    body('currency').isString().isLength({ min: 3 }).withMessage('Currency must be a string and have a minimum of three characters.'),
    body('department').isString().isLength({ min: 3 }).withMessage('Department must be a stirng and have a minimun of three characters'),
    body('sub_department').isString().isLength({ min: 3 }).withMessage('Department must be a stirng and have a minimun of three characters'),
    body('salary').isString().withMessage('Salary must be a string'),
  ],
  preControllerBodyValidation,
  StaffController.create,
);

StaffRoute.get('/', StaffController.getAllStaff);

StaffRoute.get('/ss', StaffController.getSSForAllData);

StaffRoute.get('/ss/departments', StaffController.getSSForDepartments);

StaffRoute.get('/ss/contractors', StaffController.getSSForContractors);

StaffRoute.get('/ss/subdepartments', StaffController.getSSForSubDepartment);

StaffRoute.delete(
  '/:id',
  [param('id').isNumeric().withMessage('Resource id to delete must be of type number')],
  StaffController.delete,
);

export default StaffRoute;
