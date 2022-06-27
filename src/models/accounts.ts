/* eslint-disable no-return-await */
import { DataTypes, Model } from 'sequelize';
import database from './database';

class Accounts extends Model {
  declare id: number;

  declare name: string;

  declare username: string;

  declare password: string;

  static async checkUsername(username:string) {
    return await this.count({ where: { username } }) > 0;
  }

  static async findByUsername(username:string) {
    return await this.findOne({ where: { username } });
  }
}

Accounts.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  createdAt: { field: 'created_at', type: DataTypes.DATE },
  updatedAt: { field: 'updated_at', type: DataTypes.DATE },
}, {
  // Other model options go here
  sequelize: database,
  modelName: 'accounts',
});

export default Accounts;
