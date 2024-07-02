const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionstb', {
    transaction_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to_crypto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transactionstb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
        ]
      },
    ]
  });
};
