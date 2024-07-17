const express = require('express');
const User = require('../models/user');  // Import model User
const router = express.Router();

// CRUD Routes
router.get('/', async (req, res) => {
  const users = await User.find({ deleted_at: null });
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    deleted_at: Date.now(),
  });
  res.send(user);
});

module.exports = router;
