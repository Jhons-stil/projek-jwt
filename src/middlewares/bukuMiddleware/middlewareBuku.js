const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { resGagal, resSukses } = require("../../payloads/payload.js");
const { cariBukuById, byId } = require("../../http/buku/service.js");

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

const cekInput = async (req, res, next) => {
  const { judul, harga, genre, stok } = req.body;

  if (!judul || !harga || !genre || !stok) {
    if (req.file) {
      const filePath = req.file.path;

      console.log(filePath);

      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (error) {
        console.log("gagal hapus file: ", error.message);
      }
    }

    return resGagal(
      res,
      400,
      "error",
      "judul, harga, genre, dan stok wajib diisi",
    );
  }
  next();
};

const cekIdBuku = async (req, res, next) => {
  try {
    const id = req.params.id;
    const buku = await cariBukuById(id);

    if (!buku) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return resGagal(res, 404, "error", "buku tidak ada");
    }
    req.bukuLama = buku;
    next();
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    return resGagal(res, 500, "error", error.message);
  }
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
module.exports = { upload, cekInput, cekIdBuku, cekId };
