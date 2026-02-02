const db = require("../../db/models/index.js");
const { Pembaca } = db;

const tambahPembaca = async (body) => {
  return await Pembaca.create(body);
};

const tampilPembaca = async () => {
  return await Pembaca.findAll();
};

const ubahPembaca = async (id, body) => {
  const data = await Pembaca.findByPk(id);
  return await data.update(body);
};

const hapusPembaca = async (id_pembaca) => {
  return await Pembaca.destroy({ where: { id_pembaca } });
};

const byId = async (id) => {
  return await Pembaca.findByPk(id);
};
module.exports = { tambahPembaca, tampilPembaca, ubahPembaca, hapusPembaca, byId };
