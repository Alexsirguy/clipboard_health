import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import StaffService from '../services/staff';

const errorMessage = {
  error: 'Something went wrong. Please try again',
  deleteRecord: 'Record deleted successfully',
};

class StaffController {
  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          code: 0,
          validation: errors.array(),
          message: 'Validation failed!',
        });
      }
      const data = await StaffService.createRecord(req.body);
      if (data) {
        return res
          .status(201)
          .json({ ...data });
      }

      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({
          success: false,
          message: errorMessage.error,
          error: error.message,
        });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          code: 0,
          validation: errors.array(),
          message: 'Validation failed!',
        });
      }
      const id = parseInt(req.params.id, 10);
      const data = await StaffService.deleteRecord(id);
      if (data > 0) {
        return res
          .status(200)
          .json({ success: true, message: errorMessage.deleteRecord });
      }

      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({
          success: false,
          message: errorMessage.error,
          error: error.message,
        });
    }
  }

  static async getAllStaff(req: Request, res: Response) {
    try {
      const data = await StaffService.getAllStaffs();
      if (data) {
        res.status(200).json(data);
      }
      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({ message: errorMessage.error, error: error.message });
    }
  }

  static async getSSForAllData(req: Request, res: Response) {
    try {
      const data = await StaffService.getSSForAllData();
      if (data) {
        res.status(200).json(data);
      }
      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({ message: errorMessage.error, error: error.message });
    }
  }

  static async getSSForDepartments(req: Request, res: Response) {
    try {
      const data = await StaffService.getSSForDepartments();
      if (data) {
        res.status(200).json(data);
      }
      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({ message: errorMessage.error, error: error.message });
    }
  }

  static async getSSForContractors(req: Request, res: Response) {
    try {
      const data = await StaffService.getSSForContractors();
      if (data) {
        res.status(200).json(data);
      }
      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({ message: errorMessage.error, error: error.message });
    }
  }

  static async getSSForSubDepartment(req: Request, res: Response) {
    try {
      const data = await StaffService.getSSForSubDepartments();
      if (data) {
        res.status(200).json(data);
      }
      return res.status(400).end();
    } catch (error) {
      return res
        .status(500).json({ message: errorMessage.error, error: error.message });
    }
  }
}

export default StaffController;
