const router = require('express').Router();
const Post = require('../models/Post'); 
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json('Server error: ' + err.message);
  }
});


router.post('/', async (req, res) => {
  const { title, desc, img, username, userId } = req.body;

  if (!title || !desc || !username || !userId) {
      return res.status(400).json("Missing required fields.");
  }
  
  const newPost = new Post({
    title: title,
    desc: desc,
    img: img,
    username: username,
    userId: userId
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); 
  } catch (err) {
    res.status(500).json('Server error: ' + err.message);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found.");
    }

    
    if (post.userId !== req.body.userId) {
      return res.status(401).json("You can only delete your own posts.");
    }

    await post.deleteOne();
    res.status(200).json("The post has been deleted.");

  } catch (err) {
    res.status(500).json('Server error: ' + err.message);
  }
});


module.exports = router;