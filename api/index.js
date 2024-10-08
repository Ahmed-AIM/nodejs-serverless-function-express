const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const morgan = require('morgan');

// Configure CORS
const corsOptions = {
  origin: 'https://new-repo-travel-blog.vercel.app',
  optionsSuccessStatus: 200
};

// File operation functions
const getFilePath = (filename) => path.join(__dirname, '..', 'data', filename);

async function readData(fileName) {
  const data = await fs.readFile(fileName, 'utf8');
  return JSON.parse(data);
}

async function writeData(fileName, data) {
  await fs.writeFile(fileName, JSON.stringify(data, null, 2));
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Add this new root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Travel Blog API' });
});

// User routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    res.json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({ error: 'Error reading users', details: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).json({ error: 'Error reading user', details: error.message });
  }
});

// New routes for specific user properties
app.get('/api/users/:id/username', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading username:', error);
    res.status(500).json({ error: 'Error reading username', details: error.message });
  }
});

app.get('/api/users/:id/email', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ email: user.email });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading email:', error);
    res.status(500).json({ error: 'Error reading email', details: error.message });
  }
});

app.get('/api/users/:id/bio', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ bio: user.bio });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading bio:', error);
    res.status(500).json({ error: 'Error reading bio', details: error.message });
  }
});

app.get('/api/users/:id/socialmedia', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ socialMedia: user.socialMedia });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading social media:', error);
    res.status(500).json({ error: 'Error reading social media', details: error.message });
  }
});

app.get('/api/users/:id/saveddestinations', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ savedDestinations: user.savedDestinations });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading saved destinations:', error);
    res.status(500).json({ error: 'Error reading saved destinations', details: error.message });
  }
});

app.get('/api/users/:id/postids', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ postIds: user.postIds });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading post IDs:', error);
    res.status(500).json({ error: 'Error reading post IDs', details: error.message });
  }
});

app.get('/api/users/:id/favoritepostids', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const user = users.find(user => user.id == req.params.id);
    if (user) {
      res.json({ favoritePostIds: user.favoritePostIds });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading favorite post IDs:', error);
    res.status(500).json({ error: 'Error reading favorite post IDs', details: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const newUser = { id: Date.now().toString(), ...req.body };
    users.push(newUser);
    await writeData(getFilePath('users.json'), users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const index = users.findIndex(user => user.id === req.params.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      await writeData(getFilePath('users.json'), users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const users = await readData(getFilePath('users.json'));
    const filteredUsers = users.filter(user => user.id !== req.params.id);
    await writeData(getFilePath('users.json'), filteredUsers);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// API routes for posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readData(getFilePath('data.json'));
    res.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Error reading posts', details: error.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData(getFilePath('data.json'));
    const post = posts.find(post => post.id == req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error reading post:', error);
    res.status(500).json({ error: 'Error reading post', details: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const posts = await readData(getFilePath('data.json'));
    const newPost = { id: Date.now().toString(), ...req.body };
    posts.push(newPost);
    await writeData(getFilePath('data.json'), posts);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const posts = await readData(getFilePath('data.json'));
    const index = posts.findIndex(post => post.id === req.params.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...req.body };
      await writeData(getFilePath('data.json'), posts);
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
    const posts = await readData(getFilePath('data.json'));
    const filteredPosts = posts.filter(post => post.id !== req.params.id);
    await writeData(getFilePath('data.json'), filteredPosts);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});

module.exports = app;
