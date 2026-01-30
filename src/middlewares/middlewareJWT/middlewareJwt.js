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

module.exports = { authJwt };
