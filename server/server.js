const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const morgan = require('morgan');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/users', usersRouter);

// Data file paths
const dataPath = path.join(__dirname, 'data', 'data.json');
const usersPath = path.join(__dirname, 'data', 'users.json');

// Read data from file
async function readData(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Write data to file
async function writeData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// API routes for posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readData(dataPath);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData(dataPath);
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
    const posts = await readData(dataPath);
    const newPost = { id: Date.now().toString(), ...req.body };
    posts.push(newPost);
    await writeData(dataPath, posts);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData(dataPath);
    const index = posts.findIndex(post => post.id === req.params.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...req.body };
      await writeData(dataPath, posts);
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
    const posts = await readData(dataPath);
    const filteredPosts = posts.filter(post => post.id !== req.params.id);
    await writeData(dataPath, filteredPosts);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

// API routes for users.json
app.get('/api/users', async (req, res) => {
  try {
    const users = await readData(usersPath);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users' });
  }
});

// Add a catch-all route at the end of your routes
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});