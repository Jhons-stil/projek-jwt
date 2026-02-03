require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const { resSukses, resGagal } = require("../../payloads/payload.js");
const {
  tambahPeminjam,
  tampilPeminjam,
  ubahPeminjam,
  hapusPeminjam,
  byId,
} = require("./service.js");

const getPeminjam = async (req, res) => {
  try {
    const data = await tampilPeminjam();
    return resSukses(res, 201, "success", "Data Peminjam", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await byId(id);
    return resSukses(res, 201, "success", "Data peminjam by Id", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const createPeminjam = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const { tgl_balik, status, bukuId } = req.body;

    if (req.file) {
      console.log(req.file);
      foto_buku = path.basename(req.file.path);
    }

    const buku = Number(bukuId);
    const body = { userId, tgl_balik, status, bukuId: buku, foto_buku };

    const data = await tambahPeminjam(body);
    return resSukses(
      res,
      201,
      "success",
      "Data peminjam berhasil ditambahkan",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const updatePeminjam = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { tgl_balik, status, bukuId } = req.body;

    let peminjamLama = req.peminjamLama;
    if (req.file) {
      foto_buku = req.file.filename;

      if (peminjamLama.foto_buku) {
        const pathFotoLama = path.join(
          __dirname,
          "../../uploads",
          peminjamLama.foto_buku,
        );
        try {
          await fs.access(pathFotoLama);
          await fs.unlink(pathFotoLama);
        } catch (error) {
          console.log(error);
        }
      }
    }
    const body = { userId, tgl_balik, status, foto_buku, bukuId };

    const data = await ubahPeminjam(id, body);
    return resSukses(
      res,
      200,
      "success",
      "Data peminjam berhasil diubah",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const deletePeminjam = async (req, res) => {
  try {
    const id = req.params.id;
    const fotoPeminjam = req.peminjamLama;

    if (fotoPeminjam.foto_buku) {
      const pathFotoLama = path.join(
        __dirname,
        "../../uploads",
        fotoPeminjam.foto_buku,
      );
      try {
        await fs.access(pathFotoLama);
        await fs.unlink(pathFotoLama);
      } catch (error) {
        console.log(error);
      }
    }
    const data = await hapusPeminjam(id);
    return resSukses(
      res,
      200,
      "success",
      "Data peminjam berhasil dihapus",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = {
  getPeminjam,
  createPeminjam,
  getById,
  updatePeminjam,
  deletePeminjam,
};
