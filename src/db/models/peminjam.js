"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Peminjam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peminjam.belongsTo(models.Buku, {
        foreignKey: "bukuId",
        as: "buku",
      });
      Peminjam.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Peminjam.init(
    {
      id_peminjam: {
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
      tgl_pinjam: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      tgl_balik: {
        type: DataTypes.DATE,
        allowNull: false,
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
      foto_buku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Peminjam",
      tableName: "peminjam",
    },
  );
  return Peminjam;
};
