const db = require("../../db/models/index.js");
const { Pembeli } = db;

const tambahPembeli = async (body) => {
  return await Pembeli.create(body);
};

const tampilPembeli = async () => {
  return await Pembeli.findAll();
};

const ubahPembeli = async (id, body) => {
  const data = await Pembeli.findByPk(id);
  return await data.update(body);
};

const hapusPembeli = async (id_Pembeli) => {
  return await Pembeli.destroy({ where: { id_Pembeli } });
};

const byId = async (id) => {
  return await Pembeli.findByPk(id);
};
module.exports = {
  tambahPembeli,
  tampilPembeli,
  ubahPembeli,
  hapusPembeli,
  byId,
};
