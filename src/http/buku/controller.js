const {
  tampilBuku,
  cariBukuById,
  tambahBuku,
  ubahBuku,
  hapusBuku
} = require("./service.js");

const { resSukses, resGagal } = require("../../payloads/payload");

const getBuku = async (req, res) => {
  try {
    const data = await tampilBuku();
    return resSukses(res, 200, "success", "Data buku", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getBukuById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariBukuById(id);

    if (!data) {
      return resGagal(res, 404, "error", "Buku tidak ditemukan");
    }

    return resSukses(res, 200, "success", "Detail buku", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createData = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return resGagal(res, 401, "error", "Unauthorized");
    }

    if (!req.body) {
      return resGagal(res, 400, "error", "Request body kosong");
    }

    const { judul, foto_buku, harga, genre, stok } = req.body;

    if (!judul || !harga || !genre) {
      return resGagal(
        res,
        400,
        "error",
        "judul, harga, dan genre wajib diisi"
      );
    }

    const data = {
      judul,
      foto_buku: foto_buku || null,
      harga,
      genre,
      stok: stok || 0,
      created_by: req.user.id
    };

    const result = await tambahBuku(data);
    return resSukses(res, 201, "success", "Buku berhasil ditambahkan", result);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};




const updateBuku = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const data = await ubahBuku(id, body);

    if (!data) {
      return resGagal(res, 404, "error", "Buku tidak ditemukan");
    }

    return resSukses(res, 200, "success", "Buku berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteBuku = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hapusBuku(id);

    if (data === 0) {
      return resGagal(res, 404, "error", "Buku tidak ditemukan");
    }

    return resSukses(res, 200, "success", "Buku berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getBuku,
  getBukuById,
  createData,
  updateBuku,
  deleteBuku
};

