const jwt = require("jsonwebtoken");
const { resGagal } = require("../../payloads/payload.js");

const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return resGagal(res, 401, "error", "Token tidak ada");
  }

  if (!authHeader.startsWith("Bearer ")) {
    return resGagal(res, 401, "error", "Format token salah");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return resGagal(res, 401, "error", "Token Tidak Valid");
  }
};

const cekRole = (validasiRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return resGagal(res, 401, "error", "User tidak teridentifikasi");
    }

    if (validasiRole.includes(req.user.role)) {
      next();
    } else {
      return resGagal(
        res,
        400,
        "error",
        "Akses ditolak Role anda pilih tidak di izinkan mengakses fitur ini !!!",
      );
    }
  };
};
module.exports = { authJwt, cekRole };
