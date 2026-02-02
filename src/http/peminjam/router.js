const express = require("express");
const multer = require('multer');
const path = require('path');
const {getPeminjam, createPeminjam, getById, updatePeminjam, deletePeminjam} = require("./controller.js");
const { cekId, cekInput, cekInputUpdate } = require("../../middlewares/peminjamMiddleware/middlewarePeminjam.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getPeminjam);
router.post("/", upload.single('foto_buku'), cekInput, createPeminjam);
router.get("/:id", cekId, getById);
router.put("/:id", upload.single('foto_buku'), cekId, cekInputUpdate, updatePeminjam);
router.delete("/:id", cekId, deletePeminjam);

module.exports = router