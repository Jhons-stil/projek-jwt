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
const router = express.Router();

router.post("/create", cekDuplikat, createPembeli);
router.get("/", readPembeli);
router.patch("/update/:id", cekId, updatePembeli);
router.delete("/delete/:id", cekId, deletePembeli);
router.get("/:id", cekId, getById);

module.exports = router;
