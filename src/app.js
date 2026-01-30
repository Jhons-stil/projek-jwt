const express = require("express");
const routerUser = require("./http/user/router.js");
const routerBuku = require("./http/buku/router.js");

const routerPembeli = require("./http/pembeli/router.js");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", routerUser);

app.use("/api/buku", routerBuku);

app.use("/api/pembeli", routerPembeli);

app.listen(PORT, () => {
  console.log("server Berjalan.................");
});
