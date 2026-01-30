const db = require("../../db/models/index.js");
const { User } = db;
const bcrypt = require("bcryptjs");
const { byId } = require("../../http/user/service.js");
const { resGagal } = require("../../payloads/payload.js");

const cekPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password_lama } = req.body;

    const user = await byId(id);

    if (!user) {
      return resGagal(res, 404, "error", "Data tidak ditemukan");
    }

    const cekPw = await bcrypt.compare(password_lama, user.password);

    if (!cekPw) {
      return resGagal(res, 401, "error", "password lama salah");
    }

    next();
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const cekInputUpdate = async (req, res, next) => {
  const { nama_user, password_baru, email, alamat, role } = req.body;
  if (!nama_user || !password_baru || !email || !alamat || !role) {
    return resGagal(
      res,
      404,
      "error",
      "nama, password, email, alamat, role harus diisi",
    );
  }
  next();
};

const cekInput = async (req, res, next) => {
  const { nama_user, password, email, alamat, role } = req.body;
  if (!nama_user || !password || !email || !alamat || !role) {
    return resGagal(
      res,
      404,
      "error",
      "nama, password, email, alamat, role harus diisi",
    );
  }
  next();
};

const cekId = async (req, res, next) => {
  const id = req.params.id;

  const regexId = /^\d+$/;

  if (!regexId.test(id)) {
    return resGagal(res, 404, "error", "ID harus berupa angka");
  }

  const data = await byId(id);
  if (!data) {
    return resGagal(res, 404, "error", "Data tidak ditemukan");
  }
  next();
};

const cekEmail = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(email)) {
    return resGagal(res, 400, "error", "Maaf, Format email tidak valid");
  }
  next();
};

const cekDuplikat = async (req, res, next) => {
  const { nama_user } = req.body;

  const data = await User.findOne({ nama_user });

  if (data) {
    return resGagal(
      res,
      409,
      "error",
      "Maaf, nama sudah terdaftar, silakan masukan nama yang lain",
    );
  }
  next();
};
module.exports = {
  cekPassword,
  cekInputUpdate,
  cekId,
  cekEmail,
  cekInput,
  cekDuplikat,
};
