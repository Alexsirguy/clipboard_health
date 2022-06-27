/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const preControllerBodyValidation = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      code: 0,
      validation: errors.array(),
      message: 'Validation failed!',
    });
  }
  return next();
};
