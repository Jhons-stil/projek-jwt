const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getPeminjam,
  createPeminjam,
  getById,
  updatePeminjam,
  deletePeminjam,
} = require("./controller.js");
const {
  cekId,
  cekInput,
  cekInputUpdate,
  upload,
  cekFoto,
} = require("../../middlewares/peminjamMiddleware/middlewarePeminjam.js");
const {
  authJwt,
  cekRole,
} = require("../../middlewares/middlewareJWT/middlewareJwt.js");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", authJwt, cekRole(["peminjam"]), getPeminjam);
router.post(
  "/create",
  authJwt,
  cekRole(["peminjam"]),
  upload.single("foto_buku"),
  cekInput,
  createPeminjam,
);
router.get("/:id", authJwt, cekRole(["peminjam"]), cekId, getById);
router.put(
  "/update/:id",
  authJwt,
  cekRole(["peminjam"]),
  upload.single("foto_buku"),
  cekFoto,
  cekId,
  cekInputUpdate,
  updatePeminjam,
);
router.delete(
  "/delete/:id",
  authJwt,
  cekRole(["peminjam"]),
  cekId,
  cekFoto,
  deletePeminjam,
);

module.exports = router;
