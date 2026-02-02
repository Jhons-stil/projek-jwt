require("dotenv").config();
const path = require("path")
const {  resSukses, resGagal } = require("../../payloads/payload.js");
const {tambahPeminjam, tampilPeminjam, ubahPeminjam, hapusPeminjam, byId} = require("./service.js");

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
}

const createPeminjam = async(req, res) => {
    try {
        const {userId, tgl_balik, status, bukuId, } = req.body;
        
        let foto_buku = null;
        if (req.file) {
            console.log(req.file);
            foto_buku = path.basename(req.file.path);
        };
        const body = {userId, tgl_balik, status, foto_buku, bukuId, };
        

        const data = await tambahPeminjam(body);
        return resSukses(res,201, "success", "Data peminjam berhasil ditambahkan", data);
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};

const updatePeminjam = async (req, res) => {
    try {
        const id = req.params.id;
        const {userId, tgl_balik, status, bukuId} = req.body;
        
        let foto_buku = null;
        if (req.file) {
            foto_buku = path.basename(req.file.path);
        }
        const body = {userId, tgl_balik, status, foto_buku, bukuId};
        
        const data = await ubahPeminjam(id, body);
        return resSukses(res, 200, "success", "Data peminjam berhasil diubah", data);
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};

const deletePeminjam = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await hapusPeminjam(id);
        return resSukses(res, 200, "success", "Data peminjam berhasil dihapus", data);
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};



module.exports = {
    getPeminjam, createPeminjam, getById, updatePeminjam, deletePeminjam
}