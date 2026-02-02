"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buku.hasMany(models.Pembaca, {
        foreignKey: "bukuId",
        as: "pembaca",
      });
      Buku.hasMany(models.Pembeli, {
        foreignKey: "bukuId",
        as: "pembeli",
      });
      Buku.hasMany(models.Peminjam, {
        foreignKey: "bukuId",
        as: "peminjam",
      });
    }
  }
  Buku.init(
    {
      id_buku: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      judul: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      foto_buku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre: {
        type: DataTypes.ENUM(
          "novel",
          "fiksi",
          "sejarah",
          "pendidikan",
          "religius",
          "filsafat",
          "masakan",
        ),
        allowNull: false,
      },
      stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
    },
    {
      sequelize,
      modelName: "Buku",
      tableName: "buku",
    },
  );
  return Buku;
};
