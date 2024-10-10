const express = require('express');
const Post = require('../models/postmodel');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

// Create a new post
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Comment on a post
router.post('/:id/comment', protect, async (req, res) => {
  const { body } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    const comment = {
      body,
      user: req.user._id,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
