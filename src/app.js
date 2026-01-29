const express = require("express");
const sequelize = require("./config/koneksi.js");
const app = express();
const PORT = 5000;

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: "koneksi berhasil" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log("server Berjalan.................");
});
