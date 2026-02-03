const { resSukses, resGagal } = require("../../payloads/payload.js");

const {
  tambahPembeli,
  tampilPembeli,
  hapusPembeli,
  byId,
  ubahPembeli,
} = require("./service.js");

const createPembeli = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tgl_pembeli, bukuId } = req.body;

    const body = { userId, tgl_pembeli, bukuId };
    const data = await tambahPembeli(body);
    return resSukses(res, 201, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const readPembeli = async (req, res) => {
  try {
    const data = await tampilPembeli();
    return resSukses(res, 200, "success", "Data pembeli", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updatePembeli = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { tgl_pembeli, bukuId } = req.body;

    const body = { userId, tgl_pembeli, bukuId };
    const data = await ubahPembeli(id, body);

    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deletePembeli = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hapusPembeli(id);
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
module.exports = {
  createPembeli,
  readPembeli,
  updatePembeli,
  deletePembeli,
  getById,
};
