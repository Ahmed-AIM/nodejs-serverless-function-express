# Travel Blog Website by ahmed

## Overview
This is a travel blog website focused on sharing travel experiences in Egypt. Users can post and share their travel stories, upload images, and interact with other travelers.

## Features
- User Dashboard: View and manage your posts, favorite posts, and profile.
- Blog Post Form: Create new blog posts with images and tags.
- About Us: Learn more about the travel blog and its mission.
- Footer: Consistent footer across the website.
- Destinations: Explore popular destinations in Egypt.
- Search: Find blog posts by title, tags, or destination.
- User Authentication: Login and registration functionality for users.
- Responsive Design: Mobile-friendly layout.
- Edit Profile: Users can update their profile information.
- Saved Destinations: Users can save their favorite destinations.
- Favorite Posts: Users can save and manage their favorite blog posts.
- Category Posts: View posts by specific categories.

## Technologies Used
- React
- React Router
- Bootstrap
- FontAwesome
- Express.js (for server)
- React Router
- React Quill (for rich text editing)
- Axios (for API requests)
- CSS Modules (for component-specific styling)

## File Structure
The project structure is as follows:
travel-official/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── server/
│   ├── data/
│   │   ├── data.json
│   │   └── users.json
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── BlogPost.jsx
│   │   ├── BlogPostForm.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── CategoryPosts.jsx
│   │   ├── Contact.jsx
│   │   ├── Destinations.jsx
│   │   ├── EditProfileForm.jsx
│   │   ├── FilterInput.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Homepage.jsx
│   │   ├── Login.jsx
│   │   ├── NavBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Sidebar.jsx
│   │   ├── UserDashboard.jsx
│   │   └── FavoritePosts.jsx
│   ├── styles/
│   │   ├── About.css
│   │   ├── App.css
│   │   ├── BlogPost.css
│   │   ├── BlogPostForm.css
│   │   ├── BlogPostPage.css
│   │   ├── Contact.css
│   │   ├── Destinations.css
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── Homepage.css
│   │   ├── Login.css
│   │   ├── NavBar.css
│   │   ├── SearchBar.css
│   │   ├── Sidebar.css
│   │   ├── UserDashboard.css
│   │   └── FavoritePosts.css
│   ├── App.js
│   ├── App.test.js
│   ├── apiConfig.js
│   ├── fontawesome.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── README.md
└── file_structure.txt

## Setup
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies for the client:
   ```bash
   npm install
   ```
4. Navigate to the server directory and install server dependencies:
   ```bash
   cd server
   npm install
   ```
5. Start the development server for the client:
   ```bash
   npm start
   ```
6. In a separate terminal, start the server:
   ```bash
   cd server
   node server.js
   ```

## Available Scripts
In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## API Configuration
The project uses a separate `apiConfig.js` file to manage API endpoints. Update this file if you need to change the server URL or API routes.

## Contributing
Contributions are welcome. Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Recent Changes
- Added EditProfileForm component for user profile editing
- Updated UserDashboard to include drafts and saved destinations
- Enhanced Destinations component with filtering and post display
- Improved error handling and loading states in various components
- Added FavoritePosts component for managing favorite blog posts
- Implemented CategoryPosts component for viewing posts by category
