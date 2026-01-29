const db = require("../../db/models/index.js");
const { User } = db;

const tambahUser = async (body) => {
  return await User.create(body);
};

const tampilUser = async () => {
  return await User.findAll();
};

const ubahUser = async (id, body) => {
  const data = await User.findByPk(id);
  return await data.update(body);
};

const hapusUser = async (id_user) => {
  return await User.destroy({ where: { id_user } });
};

const byId = async (id) => {
  return await User.findByPk(id);
};
module.exports = { tambahUser, tampilUser, ubahUser, hapusUser, byId };
