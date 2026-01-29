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
  cekInput,
  cekId,
  cekEmail,
} = require("../../middlewares/userMiddleware/middlewareUser.js");

const router = express.Router();

router.post("/register", cekEmail, createUser);
router.get("/", readUser);
router.patch("/update/:id", cekId, cekInput, cekPassword, updateUser);
router.delete("/delete/:id", cekId, deleteUser);
router.get("/:id", cekId, getById);
module.exports = router;
