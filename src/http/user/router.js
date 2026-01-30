const express = require("express");
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getById,
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

router.post("/register", cekDuplikat, cekInput, cekEmail, createUser);
router.get("/", readUser);
router.patch("/update/:id", cekId, cekInputUpdate, cekPassword, updateUser);
router.delete("/delete/:id", cekId, deleteUser);
router.get("/:id", cekId, getById);
module.exports = router;
