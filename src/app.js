const express = require("express");
const routerUser = require("./http/user/router.js");
const routerBuku = require("./http/buku/router.js");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", routerUser);
app.use( "/api/buku", routerBuku );

app.listen(PORT, () => {
  console.log("server Berjalan.................");
});
