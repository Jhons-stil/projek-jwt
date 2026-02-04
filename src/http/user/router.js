const express = require("express");
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getById,
  loginUser,
} = require("./controller.js");
const {
  cekPassword,
  cekInputUpdate,
  cekId,
  cekEmail,
  cekInput,
  cekDuplikat,
} = require("../../middlewares/userMiddleware/middlewareUser.js");

const router = express.Router();

router.post("/register", cekInput, cekDuplikat, cekEmail, createUser);
router.post("/login", loginUser);

router.get("/", readUser);
router.patch("/update/:id", cekId, cekInputUpdate, cekPassword, updateUser);
router.delete("/delete/:id", cekId, deleteUser);
router.get("/cari/:id", cekId, getById);
module.exports = router;
