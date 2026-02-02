const express = require("express");
const sequelize = require("./config/koneksi.js");
const routerUser = require("./http/user/router.js");
const routerPembaca = require("./http/pembaca/router.js");
const routerPeminjam = require("./http/peminjam/router.js");
const routerPembeli = require("./http/pembeli/router.js");
const routerBuku = require("./http/buku/router.js");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     res.status(200).json({ message: "koneksi berhasil" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
app.use("/api/user", routerUser);
app.use("/api/buku", routerBuku);
app.use("/api/pembaca", routerPembaca);
app.use("/api/peminjam", routerPeminjam);
app.use("/uploads", express.static("uploads"));
app.use("/api/pembeli", routerPembeli);
app.listen(PORT, () => {
  console.log("server Berjalan.................");
});
