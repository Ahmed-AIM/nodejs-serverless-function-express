const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Read users data
async function readUsers() {
  const data = await fs.readFile(usersFilePath, 'utf8');
  return JSON.parse(data);
}

// Write users data
async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users' });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const users = await readUsers();

    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      UserName: { first: firstName, last: lastName },
      email,
      password,
      createdAt: new Date().toISOString(),
      profilePicture: "./img/user1.png",
      bio: "",
      socialMedia: { facebook: "", instagram: "", twitter: "" },
      savedDestinations: [],
      postIds: [],
      favoritePostIds: []
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Add more user-related routes here (e.g., login, update profile, etc.)

module.exports = router;
