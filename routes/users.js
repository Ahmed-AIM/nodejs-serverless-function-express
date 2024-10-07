const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Read existing users
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Check if username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create new user object
    const newUser = {
      id: users.length + 1,
      username,
      UserName: {
        first: firstName,
        last: lastName
      },
      email,
      password, // Note: In a real application, you should hash the password
      createdAt: new Date().toISOString(),
      profilePicture: "./img/user1.png",
      bio: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: ""
      },
      savedDestinations: [],
      postIds: [],
      favoritePostIds: []
    };

    // Add new user to the array
    users.push(newUser);

    // Write updated users array back to file
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;
