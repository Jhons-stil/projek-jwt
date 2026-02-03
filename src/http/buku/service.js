const { where } = require("sequelize");
const db = require("../../db/models/index.js");
const { Buku } = db;

const tampilBuku = async () => {
  return await Buku.findAll();
};

const cariBukuById = async (id) => {
  return await Buku.findByPk(id);
};

const tambahBuku = async (body) => {
  return await Buku.create(body);
};

const ubahBuku = async (id, body) => {
  const data = await Buku.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusBuku = async (id) => {
  return await Buku.destroy({
    where: { id_buku: id },
  });
};
const byId = async (id) => {
  return await Buku.findByPk(id);
};

module.exports = {
  tampilBuku,
  cariBukuById,
  tambahBuku,
  ubahBuku,
  hapusBuku,
  byId,
};
