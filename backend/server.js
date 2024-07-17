const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('./models/user');  // Import model User
const Pegawai = require('./models/pegawai'); // Import model Pegawai

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sbdbkpsdm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Storage for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD Routes for User
app.get('/api/users', async (req, res) => {
  const users = await User.find({ deleted_at: null });
  res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

app.post('/api/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  res.send(user);
});

app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    deleted_at: Date.now(),
  });
  res.send(user);
});

// Endpoint login
app.post('/api/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.status(200).json({ message: 'Login successful', user });
      }
    }
    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// CRUD Routes for Pegawai
app.get('/api/pegawai', async (req, res) => {
  const pegawai = await Pegawai.find({ deleted_at: null });
  res.send(pegawai);
});

app.get('/api/pegawai/:id', async (req, res) => {
  const pegawai = await Pegawai.findById(req.params.id);
  res.send(pegawai);
});

app.post('/api/pegawai', async (req, res) => {
  const existingPegawai = await Pegawai.findOne({ nip: req.body.nip });
  if (existingPegawai) {
    return res.status(400).json({ message: 'NIP already exists' });
  }
  const pegawai = new Pegawai(req.body);
  await pegawai.save();
  res.send(pegawai);
});

app.put('/api/pegawai/:id', async (req, res) => {
  const pegawai = await Pegawai.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(pegawai);
});

app.delete('/api/pegawai/:id', async (req, res) => {
  const pegawai = await Pegawai.findByIdAndUpdate(req.params.id, {
    deleted_at: Date.now(),
  });
  res.send(pegawai);
});

// Endpoint for importing pegawai from Excel
app.post('/api/import-pegawai', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const { nip, nama_lengkap, instansi, pangkat_golongan, jabatan, esalon, tahun, pkn, pka, pkp } = row;
      const existingPegawai = await Pegawai.findOne({ nip });

      if (existingPegawai) {
        // Update existing pegawai
        existingPegawai.nama_lengkap = nama_lengkap;
        existingPegawai.instansi = instansi;
        existingPegawai.pangkat_golongan = pangkat_golongan;
        existingPegawai.jabatan = jabatan;
        existingPegawai.esalon = esalon;
        existingPegawai.tahun = tahun;
        existingPegawai.pkn = pkn;
        existingPegawai.pka = pka;
        existingPegawai.pkp = pkp;
        await existingPegawai.save();
      } else {
        // Create new pegawai
        const newPegawai = new Pegawai({
          nip,
          nama_lengkap,
          instansi,
          pangkat_golongan,
          jabatan,
          esalon,
          tahun,
          pkn,
          pka,
          pkp,
        });
        await newPegawai.save();
      }
    }

    res.status(200).json({ message: 'Data pegawai berhasil diimpor.' });
  } catch (error) {
    console.error('Error importing pegawai:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint for downloading the template
app.get('/api/download-template', (req, res) => {
  const filePath = path.join(__dirname, 'template_pegawai.xlsx');
  const fileName = 'template_pegawai.xlsx'; // Nama file yang ingin Anda tampilkan

  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
    }
  });
});

// Endpoint search pegawai
app.get('/api/search-pegawai', async (req, res) => {
  const { category, keyword } = req.query;

  let query = {};

  if (category === 'Semua') {
    query = {
      $or: [
        { nip: keyword },
        { nama_lengkap: new RegExp(keyword, 'i') },
        { instansi: new RegExp(keyword, 'i') },
        { jabatan: new RegExp(keyword, 'i') }
      ]
    };
  } else if (category === 'nip') {
    query = { nip: keyword };
  } else if (category === 'nama_lengkap') {
    query = { nama_lengkap: new RegExp(keyword, 'i') };
  } else if (category === 'instansi') {
    query = { instansi: new RegExp(keyword, 'i') };
  } else if (category === 'jabatan') {
    query = { jabatan: new RegExp(keyword, 'i') };
  }

  try {
    const pegawai = await Pegawai.find(query);
    res.send(pegawai);
  } catch (error) {
    console.error('Error fetching pegawai:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
