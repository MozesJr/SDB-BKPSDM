const mongoose = require('mongoose');

const informasiSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  tanggal_upload: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

const Informasi = mongoose.model('Informasi', informasiSchema);
module.exports = Informasi;
