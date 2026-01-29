"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembeli extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembeli.belongsTo(models.Buku, {
        foreignKey: "bukuId",
        as: "buku",
      });
      Pembeli.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Pembeli.init(
    {
      id_pembeli: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id_user",
        },
        allowNull: false,
      },
      tgl_pembeli: {
        type: DataTypes.DATE,
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
      modelName: "Pembeli",
      tableName: "pembeli",
    },
  );
  return Pembeli;
};
