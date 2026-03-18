const router = require('express').Router();
const Idea = require('../models/Idea');
const { verifyToken } = require('../verifyToken'); 


router.post('/', verifyToken, async (req, res) => {
  
  const newIdea = new Idea({
    text: req.body.text,
    username: req.user.username, 
    userId: req.user.id,       
  });

  try {
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea); 
  } catch (err) {
    res.status(500).json('Server error: ' + err.message);
  }
});

module.exports = router;