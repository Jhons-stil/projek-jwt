const express = require("express");
const { 
    getPembaca, createPembaca, updatePembaca, deletePembaca, getById
 } = require("./controller.js");
const { cekId, cekInput, cekInputUpdate } = require("../../middlewares/pembacaMiddleware/middlewarePembaca.js");

const router = express.Router();

router.get("/", getPembaca);
router.get("/detail/:id", cekId, getById);

router.delete("/hapus/:id", cekId, deletePembaca);

router.post("/tambah", cekInput, createPembaca);

router.patch("/ubah/:id", cekId, cekInputUpdate, updatePembaca);

module.exports = router;