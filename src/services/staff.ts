/* eslint-disable max-len */
import staffs from '../models/staffs';
import Helper, { Tdata } from '../utils/helper';

class StaffService {
  static async createRecord(params) {
    const data = await staffs.create(params);
    return data.toJSON();
  }

  static async deleteRecord(id:number) {
    const data = await staffs.deleteRecord(id);
    return data;
  }

  static async getAllStaffs() {
    const data = await staffs.getAll();
    return data;
  }

  static async getSSForAllData() {
    const data: Tdata[] = await staffs.getAll();
    const ss = Helper.getSS(data);
    return ss;
  }

  static async getSSForContractors() {
    const data: Tdata[] = await staffs.getByContractorStatus();
    const ss = Helper.getSS(data);
    return ss;
  }

  static async getSSForDepartments() {
    const uniqueDepartments = {};
    let departmentSS = {};
    const data: Tdata[] = await staffs.getAll();
    departmentSS = Helper.getSS(data);
    data.map((d) => {
      if (!uniqueDepartments[d.department]) {
        const dataByDepartment = data.filter((f) => f.department === d.department);
        departmentSS[d.department.toLowerCase()] = Helper.getSS(dataByDepartment);
        uniqueDepartments[d.department] = d.department;
      }
    });
    return departmentSS;
  }

  static async getSSForSubDepartments() {
    const uniqueDepartments = {};
    const uniqueSubDepartments = {};
    let subdepartmentSS = {};
    const data: Tdata[] = await staffs.getAll();
    subdepartmentSS = Helper.getSS(data);
    data.map((d) => {
      if (!uniqueDepartments[d.department]) {
        const dataByDepartment = data.filter((f) => f.department === d.department);
        subdepartmentSS[d.department.toLowerCase()] = Helper.getSS(dataByDepartment);
        uniqueDepartments[d.department] = d.department;
      }

      if (!uniqueSubDepartments[`${d.department}_${d.sub_department}`]) {
        const dataBySubDepartment = data.filter(
          (f) => f.department === d.department
            && f.sub_department === d.sub_department,
        );
        subdepartmentSS[d.department.toLowerCase()][d.sub_department.toLowerCase()] = Helper.getSS(dataBySubDepartment);
        uniqueSubDepartments[`${d.department}_${d.sub_department}`] = d.sub_department;
      }
    });
    return subdepartmentSS;
  }
}

export default StaffService;
