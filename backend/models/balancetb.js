const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('balancetb', {
    balance_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    crypto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(20,8),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'balancetb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "balance_id" },
        ]
      },
    ]
  });
};
