const { byId } = require("../../http/pembeli/service.js");
const { resGagal } = require("../../payloads/payload.js");

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
  const { nama_pembeli, userId, tgl_pembeli, bukuId } = req.body;
  if (!nama_pembeli || !userId || !tgl_pembeli || !bukuId) {
    return resGagal(
      res,
      404,
      "error",
      "nama, userId, tgl_pembeli dan bukuId harus diisi",
    );
  }
  next();
};

module.exports = {
  cekId,
  cekInput,
};
