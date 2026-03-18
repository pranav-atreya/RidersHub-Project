const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
router.post('/register', async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json('Email already exists.');
    }
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json('Username is already taken, try another one.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      bike: req.body.bike,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});



router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('Wrong username or password.');
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json('Wrong username or password.');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    const { password, ...userData } = user._doc;
    res.status(200).json({ ...userData, token });

  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});

module.exports = router;