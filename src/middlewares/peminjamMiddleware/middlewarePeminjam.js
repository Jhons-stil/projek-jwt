const { resGagal } = require("../../payloads/payload.js");
const { byId } = require("../../http/peminjam/service.js");

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

const cekInput = async (req, res, next) => {
  const { userId, tgl_balik, status, bukuId } = req.body;
  if (!userId || !tgl_balik || !status || !bukuId) {
    return resGagal(res, 400, "error", "userId, tgl_balik, status, bukuId harus diisi");
  }
  next();
};

const cekInputUpdate = async (req, res, next) => {
  const { userId, tgl_balik, status, bukuId } = req.body;
  if (!userId || !tgl_balik || !status || !bukuId) {
    return resGagal(res, 400, "error", "userId, tgl_balik, status, bukuId harus diisi");
  }
  next();
};

module.exports = {
  cekId,
  cekInput,
  cekInputUpdate,
};