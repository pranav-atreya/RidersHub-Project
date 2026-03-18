const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post'); 
const { verifyToken } = require('../verifyToken'); 


router.put('/:id', verifyToken, async (req, res) => {
  
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can only update your own account.");
  }

  try {
   
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          bike: req.body.bike,
          profilePic: req.body.profilePic,
          bikePic: req.body.bikePic,
        },
      },
      { new: true } 
    );
    
    const { password, ...userData } = updatedUser._doc;
    res.status(200).json(userData);

  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});


router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can only delete your own account.");
  }

  try {
    
    await Post.deleteMany({ userId: req.params.id });
    
   
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json("Account and all posts have been deleted.");

  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

module.exports = router;