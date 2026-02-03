const db = require("../../db/models/index.js");
const { Peminjam, User, Buku } = db;

const tambahPeminjam = async (body) => {
  return await Peminjam.create(body);
};

const tampilPeminjam = async () => {
  return await Peminjam.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Buku,
        as: "buku",
      },
    ],
  });
};

const ubahPeminjam = async (id, body) => {
  const data = await Peminjam.findByPk(id);
  return await data.update(body);
};

const hapusPeminjam = async (id_peminjam) => {
  return await Peminjam.destroy({ where: { id_peminjam } });
};

const byId = async (id) => {
  return await Peminjam.findByPk(id);
};
module.exports = {
  tambahPeminjam,
  tampilPeminjam,
  ubahPeminjam,
  hapusPeminjam,
  byId,
};
