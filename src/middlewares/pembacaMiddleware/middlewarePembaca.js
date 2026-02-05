const { resGagal } = require("../../payloads/payload.js");
const { byId } = require("../../http/pembaca/service.js");

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
  const { status, bukuId } = req.body;
  if (!status || !bukuId) {
    return resGagal(res, 400, "error", " status, bukuId harus diisi");
  }
  next();
};

const cekInputUpdate = async (req, res, next) => {
  const { userId, status, bukuId } = req.body;
  if (!userId || !status || !bukuId) {
    return resGagal(res, 400, "error", "userId, status, bukuId harus diisi");
  }
  next();
};

module.exports = {
  cekId,
  cekInput,
  cekInputUpdate,
};
