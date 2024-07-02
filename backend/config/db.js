const { Sequelize } = require('sequelize')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')
const initModels = require('../models/init-models')
//import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('exchangedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize.authenticate();

const db = {
  ...initModels(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
module.exports = db


// npx sequelize-auto -o "./models" -d exchangedb -h 127.0.0.1 -u root -p 3306 -x "" -e mysql
