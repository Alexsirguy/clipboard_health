import { validationResult } from 'express-validator';
import AccountService from '../services/account';

class AccountController {
  static async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          code: 0,
          validation: errors.array(),
          message: 'Validation failed!',
        });
      }

      const { username, password } = req.body;

      const authenticatedData = await AccountService.login(username, password);
      if (authenticatedData.success) {
        return res
          .status(200)
          .json({ ...authenticatedData });
      }

      return res.status(401).json({ ...authenticatedData });
    } catch (error) {
      return res
        .status(500).json({ success: false, message: 'Something went wrong. Please try again', error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          code: 0,
          validation: errors.array(),
          message: 'Validation failed!',
        });
      }

      const { username, password, name } = req.body;

      const data = await AccountService.register(name, username, password);
      if (data.success) {
        return res
          .status(200)
          .json({ ...data });
      }
      if (data.userTaken) {
        return res.status(409).json({ ...data });
      }
      return res.status(422).json({ ...data });
    } catch (error) {
      return res
        .status(500).json({ success: false, message: 'Something went wrong. Please try again', error: error.message });
    }
  }
}

export default AccountController;
