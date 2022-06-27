/* eslint-disable no-return-await */
import { DataTypes, Model } from 'sequelize';
import database from './database';

class staffs extends Model {
  declare id: number;

  declare name: string;

  declare salary: number;

  declare currency: string;

  declare department: string;

  declare sub_department: string;

  declare on_contract: boolean;

  static async getByDepartment(department:string) {
    return await this.findAll({ where: { department }, raw: true });
  }

  static async getByContractorStatus(option = { onContract: true }) {
    return await this.findAll({ where: { on_contract: option.onContract }, raw: true });
  }

  static async getAll() {
    return await this.findAll({ raw: true });
  }

  static async deleteRecord(id) {
    return await this.destroy({ where: { id } });
  }
}

staffs.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  salary: { type: DataTypes.DOUBLE },
  currency: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  on_contract: { type: DataTypes.BOOLEAN },
  department: { type: DataTypes.STRING },
  sub_department: { type: DataTypes.STRING },
  createdAt: { field: 'created_at', type: DataTypes.DATE },
  updatedAt: { field: 'updated_at', type: DataTypes.DATE },
}, {
  // Other model options go here
  sequelize: database,
  modelName: 'staffs',
});

export default staffs;
