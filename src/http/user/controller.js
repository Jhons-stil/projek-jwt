require("dotenv").config();
const { resSukses, resGagal } = require("../../payloads/payload");
const {
  tambahUser,
  tampilUser,
  ubahUser,
  hapusUser,
  byId,
} = require("./service");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { nama_user, password, email, alamat, role } = req.body;

    const salt = Number(process.env.BCRYPT_SALT);
    const passwrdAcak = await bcrypt.hash(password, salt);

    const body = { nama_user, password: passwrdAcak, email, alamat, role };
    const data = await tambahUser(body);
    return resSukses(res, 201, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const readUser = async (req, res) => {
  try {
    const data = await tampilUser();
    return resSukses(res, 200, "success", "Data User", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { nama_user, password_baru, email, alamat, role } = req.body;

    const salt = Number(process.env.BCRYPT_SALT);
    const passwrdAcak = await bcrypt.hash(password_baru, salt);
    const body = { nama_user, password: passwrdAcak, email, alamat, role };
    const data = await ubahUser(id, body);

    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hapusUser(id);
    return resSukses(res, 200, "success", "Data berhasil dihapus", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await byId(id);
    return resSukses(res, 200, "success", "Data User", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = { createUser, readUser, updateUser, deleteUser, getById };
