const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cryptotb', {
    crypto_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    price_usd: {
      type: DataTypes.DECIMAL(20,8),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cryptotb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "crypto_id" },
        ]
      },
    ]
  });
};
