const express = require("express");

const {
  createPembeli,
  readPembeli,
  updatePembeli,
  deletePembeli,
  getById,
} = require("./controller.js");
const {
  cekDuplikat,
  cekId,
} = require("../../middlewares/pembeliMiddleware/middlewarePembeli.js");
const { authJwt } = require("../../middlewares/middlewareJWT/middlewareJwt.js");
const router = express.Router();

router.post("/create", authJwt, cekDuplikat, createPembeli);
router.get("/", authJwt, readPembeli);
router.patch("/update/:id", authJwt, cekId, updatePembeli);
router.delete("/delete/:id", authJwt, cekId, deletePembeli);
router.get("/:id", authJwt, cekId, getById);

module.exports = router;
