const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const usersRouter = require('../server/routes/users');
const { readData, writeData } = require('../server/utils/fileOperations');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/users', usersRouter);

// API routes for posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readData('data.json');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData('data.json');
    const post = posts.find(post => post.id === req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading post' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const posts = await readData('data.json');
    const newPost = { id: Date.now().toString(), ...req.body };
    posts.push(newPost);
    await writeData('data.json', posts);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData('data.json');
    const index = posts.findIndex(post => post.id === req.params.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...req.body };
      await writeData('data.json', posts);
      res.json(posts[index]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData('data.json');
    const filteredPosts = posts.filter(post => post.id !== req.params.id);
    await writeData('data.json', filteredPosts);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

module.exports = app;
