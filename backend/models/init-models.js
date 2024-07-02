var DataTypes = require("sequelize").DataTypes;
var _balancetb = require("./balancetb");
var _cryptotb = require("./cryptotb");
var _transactionstb = require("./transactionstb");
var _usertb = require("./usertb");

function initModels(sequelize) {
  var balancetb = _balancetb(sequelize, DataTypes);
  var cryptotb = _cryptotb(sequelize, DataTypes);
  var transactionstb = _transactionstb(sequelize, DataTypes);
  var usertb = _usertb(sequelize, DataTypes);


  return {
    balancetb,
    cryptotb,
    transactionstb,
    usertb,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
