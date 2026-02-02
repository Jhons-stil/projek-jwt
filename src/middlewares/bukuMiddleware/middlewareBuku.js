const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { resGagal } = require("../../payloads/payload");

const dir = "scr/uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, tru);
  } else {
    cb(new Error("file harus PNG, JPG dan JPEG"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const cekInput = (req, res, next) => {
  const { judul, harga, genre, stok } = req.body;

  if (!judul || !harga || !genre || !stok) {
    if (req.file) {
      const filePath = path.join(__dirname, "../../uploads", req.file.filename);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
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

module.exports = { upload, cekInput };
