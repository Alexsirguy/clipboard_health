import { Sequelize } from 'sequelize';

const database = new Sequelize('sqlite::memory:');
(async function () {
  await database.sync();
}());

export default database;
