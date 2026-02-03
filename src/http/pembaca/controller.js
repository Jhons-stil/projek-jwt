require("dotenv").config();
const { resSukses, resGagal } = require("../../payloads/payload.js");
const {
  tambahPembaca,
  tampilPembaca,
  ubahPembaca,
  hapusPembaca,
  byId,
} = require("./service.js");

const getPembaca = async (req, res) => {
  try {
    const data = await tampilPembaca();
    return resSukses(res, 201, "success", "Data Pembaca", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await byId(id);
    return resSukses(res, 201, "success", "Data Pembaca by Id", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createPembaca = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, bukuId } = req.body;
    const body = { userId, status, bukuId };
    const data = await tambahPembaca(body);
    return resSukses(
      res,
      201,
      "success",
      "Data pembaca berhasil ditambahkan",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updatePembaca = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { status, bukuId } = req.body;
    const body = { userId, status, bukuId };
    const data = await ubahPembaca(id, body);
    return resSukses(res, 201, "success", "Data pembaca berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deletePembaca = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hapusPembaca(id);
    return resSukses(
      res,
      201,
      "success",
      "Data pembaca berhasil dihapus",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getPembaca,
  createPembaca,
  updatePembaca,
  deletePembaca,
  getById,
};
