const { User } = require("../../db/models/index.js");
const bcrypt = require("bcryptjs");
const { byId } = require("../../http/user/service.js");
const { resGagal } = require("../../payloads/payload.js");

const cekPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password_lama } = req.body;

    if (!password_lama) {
      return resGagal(res, 400, "error", "Password lama wajib diisi");
    }

    const user = await byId(id);
    if (!user) {
      return resGagal(res, 404, "error", "User tidak ditemukan");
    }

    const cocok = await bcrypt.compare(password_lama, user.password);
    if (!cocok) {
      return resGagal(res, 401, "error", "Password lama salah");
    }

    next();
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

<<<<<<< HEAD
const cekInputUpdate = async (req, res, next) => {
  const { nama_user, password_baru, email, alamat, role } = req.body;
  if (!nama_user || !password_baru || !email || !alamat || !role) {
=======
/**
 * CEK INPUT CREATE USER
 */
const cekInput = (req, res, next) => {
  const { nama_user, password, email, alamat, role } = req.body;

  if (!nama_user || !password || !email || !alamat || !role) {
>>>>>>> Topa
    return resGagal(
      res,
      400,
      "error",
<<<<<<< HEAD
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
=======
      "nama, password, email, alamat, dan role wajib diisi",
>>>>>>> Topa
    );
  }
  next();
};

/**
 * CEK INPUT UPDATE USER
 */
const cekInputUpdate = (req, res, next) => {
  const { nama_user, password_baru, email, alamat, role } = req.body;

  if (!nama_user && !password_baru && !email && !alamat && !role) {
    return resGagal(res, 400, "error", "Minimal satu field harus diisi");
  }
  next();
};

/**
 * CEK FORMAT ID
 */
const cekId = async (req, res, next) => {
  const id = req.params.id;
  const regexId = /^\d+$/;

  if (!regexId.test(id)) {
    return resGagal(res, 400, "error", "ID harus berupa angka");
  }

  const data = await byId(id);
  if (!data) {
    return resGagal(res, 404, "error", "Data tidak ditemukan");
  }

  next();
};

/**
 * CEK FORMAT EMAIL
 */
const cekEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !regexEmail.test(email)) {
    return resGagal(res, 400, "error", "Format email tidak valid");
  }
  next();
};

<<<<<<< HEAD
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
=======
/**
 * CEK DUPLIKAT EMAIL
 */
const cekDuplikat = async (req, res, next) => {
  const { email } = req.body;

  const data = await User.findOne({ where: { email } });
  if (data) {
    return resGagal(res, 409, "error", "Email sudah terdaftar");
  }
  next();
};

module.exports = {
  cekPassword,
  cekInput,
  cekInputUpdate,
  cekId,
  cekEmail,
>>>>>>> Topa
  cekDuplikat,
};
