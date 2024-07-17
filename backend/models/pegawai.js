const mongoose = require('mongoose');

const pegawaiSchema = new mongoose.Schema({
  nip: { type: String, unique: true },
  nama_lengkap: String,
  instansi: String,
  pangkat_golongan: String,
  jabatan: String,
  esalon: String,
  tahun: String,
  pkn: Boolean,
  pka: Boolean,
  pkp: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: Date,
});

module.exports = mongoose.model('Pegawai', pegawaiSchema);
