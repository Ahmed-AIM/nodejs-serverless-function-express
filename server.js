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


// API routes for data.json
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readData(dataPath);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading posts' });
  }
});


app.get('/api/posts/:id', async (req, res) => {
  console.log('Route /api/posts/:id hit with id:', req.params.id);
  try {
    console.log('Fetching post with id:', req.params.id);
    const posts = await readData(dataPath);
    console.log('All posts:', posts);
    const post = posts.find(post => post.id === req.params.id);
    if (post) {
      console.log('Post found:', post);
      res.json(post);
    } else {
      console.log('Post not found');
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error reading post:', error);
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


app.post('/api/users', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const newUser = { id: Date.now().toString(), ...req.body };
    users.push(newUser);
    await writeData(usersPath, users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});


app.put('/api/users/:userId', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(user => user.id === req.params.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      await writeData(usersPath, users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});


app.delete('/api/users/:userId', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const filteredUsers = users.filter(user => user.id !== req.params.id);
    await writeData(usersPath, filteredUsers);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});


app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const posts = await readData(dataPath);
    const postIndex = posts.findIndex(post => post.id === req.params.id);
    if (postIndex !== -1) {
      const newComment = {
        id: Date.now().toString(),
        ...req.body,
        date: new Date().toISOString()
      };
      posts[postIndex].comments.push(newComment);
      await writeData(dataPath, posts);
      res.status(201).json(newComment);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});


app.get('/api/users/:id', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading user data' });
  }
});


app.put('/api/users/:id/profile', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      await writeData(usersPath, users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
  }
});


app.post('/api/users/:id/itineraries', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
      const newItinerary = { id: Date.now().toString(), ...req.body };
      users[index].travelItineraries.push(newItinerary);
      await writeData(usersPath, users);
      res.status(201).json(newItinerary);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding itinerary' });
  }
});


app.post('/api/users/:id/savedDestinations', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
      users[index].savedDestinations.push(req.body.destination);
      await writeData(usersPath, users);
      res.status(201).json(users[index].savedDestinations);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding saved destination' });
  }
});

// Get favorite post IDs for a user
app.get('/api/users/:id/favoritePostIds', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user.favoritePostIds || []);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching favorite post IDs:', error);
    res.status(500).json({ error: 'Error fetching favorite post IDs' });
  }
});

// get favorites post ids for a user.
app.get(`/api/users/:id/favoritePostIds/:postId`, async (req, res) => {
  try {
    const users = await readData(usersPath);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user.favoritePostIds.includes(req.params.postId));
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching favorite post IDs:', error);
    res.status(500).json({ error: 'Error fetching favorite post IDs' });
  }
});

// // Get favorite posts for a user
// app.get('/api/users/:id/favoritePosts', async (req, res) => {
//   try {
//     const users = await readData(usersPath);
//     const user = users.find(u => u.id === parseInt(req.params.id));
//     if (user) {
//       const posts = await readData(dataPath);
//       const favoritePosts = posts.filter(post => user.favoritePostIds.includes(post.id));
//       res.json(favoritePosts);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching favorite posts' });
//   }
// });


// Add a post to user's favorites
app.post('/api/users/:userId/favoritePostIds', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(u => u.id === parseInt(req.params.userId));
    if (index !== -1) {
      if (!users[index].favoritePostIds.includes(req.body.postId)) {
        users[index].favoritePostIds.push(req.body.postId);
        await writeData(usersPath, users);
        res.status(201).json(users[index].favoritePostIds);
      } else {
        res.status(400).json({ error: 'Post already in favorites' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding favorite post' });
  }
});

// Remove a post from user's favorites
app.delete('/api/users/:userId/favoritePostIds/:postId', async (req, res) => {
  try {
    const users = await readData(usersPath);
    const index = users.findIndex(u => u.id === parseInt(req.params.userId));
    if (index !== -1) {
      const favoritePostIndex = users[index].favoritePostIds.indexOf(req.params.postId);
      if (favoritePostIndex !== -1) {
        users[index].favoritePostIds.splice(favoritePostIndex, 1);
        await writeData(usersPath, users);
        res.json(users[index].favoritePostIds);
      } else {
        res.status(404).json({ error: 'Post not found in favorites' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error removing favorite post' });
  }
});


// Add a catch-all route at the end of your routes
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).send('Route not found');
});


app.listen(PORT, () => {
  console.log(`Ahmed's code: Server is running on port ${PORT}`);
});

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Mock authentication middleware (replace with your actual auth system)
const getCurrentUser = async (req, res, next) => {
  // For demonstration, we're using a fixed user ID. In a real app, get this from the session.
  const userId = 1;
  const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  req.currentUser = users.find(user => user.id === userId);
  next();
};

app.get('/api/current-user', getCurrentUser, (req, res) => {
  res.json(req.currentUser);
});

app.post('/api/add-favorite', getCurrentUser, async (req, res) => {
  const { postId } = req.body;
  const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  const userIndex = users.findIndex(user => user.id === req.currentUser.id);
  
  if (!users[userIndex].favoritePostIds.includes(postId)) {
    users[userIndex].favoritePostIds.push(postId);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Post already in favorites' });
  }
});

app.post('/api/remove-favorite', getCurrentUser, async (req, res) => {
  const { postId } = req.body;
  const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  const userIndex = users.findIndex(user => user.id === req.currentUser.id);
  
  const favoriteIndex = users[userIndex].favoritePostIds.indexOf(postId);
  if (favoriteIndex !== -1) {
    users[userIndex].favoritePostIds.splice(favoriteIndex, 1);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Post not in favorites' });
  }
});

// ... other routes and server setup