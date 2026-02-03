const express = require("express");
const {
  getPembaca,
  createPembaca,
  updatePembaca,
  deletePembaca,
  getById,
} = require("./controller.js");
const {
  cekId,
  cekInput,
  cekInputUpdate,
} = require("../../middlewares/pembacaMiddleware/middlewarePembaca.js");
const {
  authJwt,
  cekRole,
} = require("../../middlewares/middlewareJWT/middlewareJwt.js");

const router = express.Router();

router.get("/", authJwt, cekRole(["pembaca"]), getPembaca);
router.get("/detail/:id", authJwt, cekRole(["pembaca"]), cekId, getById);

router.delete(
  "/hapus/:id",
  authJwt,
  cekRole(["pembaca"]),
  cekId,
  deletePembaca,
);

router.post("/create", authJwt, cekRole(["pembaca"]), cekInput, createPembaca);

router.patch(
  "/ubah/:id",
  authJwt,
  cekRole(["pembaca"]),
  cekId,
  cekInputUpdate,
  updatePembaca,
);

module.exports = router;
