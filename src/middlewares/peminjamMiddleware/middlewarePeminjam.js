const { resGagal } = require("../../payloads/payload.js");
const { byId } = require("../../http/peminjam/service.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const dir = "src/uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ambilExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ambilExt);
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("file harus PNG, JPG dan JPEG"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

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
    return resGagal(
      res,
      400,
      "error",
      "userId, tgl_balik, status, bukuId harus diisi",
    );
  }
  next();
};

const cekInputUpdate = async (req, res, next) => {
  const { userId, tgl_balik, status, bukuId } = req.body;
  if (!userId || !tgl_balik || !status || !bukuId) {
    return resGagal(
      res,
      400,
      "error",
      "userId, tgl_balik, status, bukuId harus diisi",
    );
  }
  next();
};

const cekFoto = async (req, res, next) => {
  try {
    const id = req.params.id;
    const peminjam = await byId(id);

    if (!peminjam) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return resGagal(res, 404, "error", "peminjam tidak ditemukan");
    }
    req.peminjamLama = peminjam;
    next();
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  cekId,
  cekInput,
  cekInputUpdate,
  upload,
  cekFoto,
};
