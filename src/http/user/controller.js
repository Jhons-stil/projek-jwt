require("dotenv").config();
const db = require("../../db/models/index.js");
const { User } = db;
const jwt = require("jsonwebtoken");
const { resSukses, resGagal } = require("../../payloads/payload");
const {
  tambahUser,
  tampilUser,
  ubahUser,
  hapusUser,
  byId,
} = require("./service");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return resGagal(res, 404, "error", "User tidak ditemukan");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return resGagal(res, 401, "error", "Password salah");
    }

   const token = jwt.sign(
  {
    id: user.id_user,        
    role: user.role,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    return resSukses(res, 200, "success", "Login berhasil", {
      token
    });
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  loginUser
};

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
    const passwordAcak = await bcrypt.hash(password_baru, salt);
    
    const body = { nama_user, password_baru: passwordAcak, email, alamat, role };
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
module.exports = { createUser, readUser, updateUser, deleteUser, getById, loginUser };
