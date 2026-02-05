const express = require("express");
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getById,
  loginUser,
  register,
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

router.post("/create", cekInput, cekDuplikat, cekEmail, createUser);
router.post("/register", cekInput, cekDuplikat, cekEmail, register);
router.post("/login", loginUser);

router.get("/", readUser);
router.patch("/update/:id", cekId, cekInputUpdate, updateUser);
router.delete("/delete/:id", cekId, deleteUser);
router.get("/cari/:id", cekId, getById);
module.exports = router;
