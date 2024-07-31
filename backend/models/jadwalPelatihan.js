const mongoose = require('mongoose');

const jadwalPelatihanSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  file_pdf: { type: String, required: true },
  tlg_upload: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

module.exports = mongoose.model('JadwalPelatihan', jadwalPelatihanSchema);
