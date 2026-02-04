const express = require("express");

const {
  createPembeli,
  readPembeli,
  updatePembeli,
  deletePembeli,
  getById,
} = require("./controller.js");
const {
  cekId,
} = require("../../middlewares/pembeliMiddleware/middlewarePembeli.js");
const {
  authJwt,
  cekRole,
} = require("../../middlewares/middlewareJWT/middlewareJwt.js");
const router = express.Router();

router.post("/create", authJwt, cekRole(["pembeli"]), createPembeli);
router.get("/", authJwt, cekRole(["pembeli"]), readPembeli);
router.patch(
  "/update/:id",
  authJwt,
  cekRole(["pembeli"]),
  cekId,
  updatePembeli,
);
router.delete(
  "/delete/:id",
  authJwt,
  cekRole(["pembeli"]),
  cekId,
  deletePembeli,
);
router.get("/cari/:id", authJwt, cekRole(["pembeli"]), cekId, getById);

module.exports = router;
