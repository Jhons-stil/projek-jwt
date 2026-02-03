const express = require("express");
const router = express.Router();

const { authJwt } = require("../../middlewares/middlewareJWT/middlewareJwt.js");
const bukuController = require("./controller.js");
const {
  cekInput,
  upload,
  cekIdBuku,
  cekId,
} = require("../../middlewares/bukuMiddleware/middlewareBuku.js");
const { getBuku, getBukuById, createData, updateBuku, deleteBuku } =
  bukuController;

router.get("/", authJwt, getBuku);
router.get("/cari/:id", authJwt, getBukuById);
router.post(
  "/create",
  authJwt,
  upload.single("foto_buku"),
  cekInput,
  createData,
);

router.patch(
  "/update/:id",
  authJwt,
  upload.single("foto_buku"),
  cekIdBuku,
  updateBuku,
);
router.delete("/delete/:id", authJwt, cekId, cekIdBuku, deleteBuku);

module.exports = router;
