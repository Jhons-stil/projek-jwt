"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembaca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembaca.belongsTo(models.Buku, {
        foreignKey: "bukuId",
        as: "buku",
      });
      Pembaca.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Pembaca.init(
    {
      id_pembaca: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id_user",
        },
      },
      status: {
        type: DataTypes.ENUM("bagus", "rusak"),
        allowNull: false,
      },
      bukuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "buku",
          key: "id_buku",
        },
      },
    },
    {
      sequelize,
      modelName: "Pembaca",
      tableName: "pembaca",
    },
  );
  return Pembaca;
};
