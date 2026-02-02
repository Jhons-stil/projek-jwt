const express = require("express");
const router = express.Router();

const { authJwt } = require("../../middlewares/middlewareJWT/middlewareJwt.js");
const bukuController = require("./controller.js");
const {
  cekInput,
  upload,
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
router.put("/update/:id", authJwt, updateBuku);
router.delete("/delete/:id", authJwt, deleteBuku);

module.exports = router;
