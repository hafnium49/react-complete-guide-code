// --- Backend API (REST API) ---
//
// This file sets up a simple backend web server that the React frontend
// can communicate with via HTTP requests. It is built with Node.js and
// Express.js — a popular server-side JavaScript framework. You do NOT
// need React knowledge to understand this file; React is a FRONTEND
// library and does not run on the server.
//
// --- Why a Backend? ---
//
// The React app runs entirely in the user's browser. Any data stored in
// React state (like the posts array) lives only in memory and is lost
// when the page is reloaded. To persist data across page loads and share
// it between users, you need a BACKEND — a separate application running
// on a server that can read from and write to durable storage (a file,
// a database, etc.).
//
// The frontend and backend communicate over HTTP: the React app sends
// requests (e.g., "give me all posts" or "save this new post"), and the
// backend responds with data (JSON). This request/response cycle is the
// foundation of most web applications.
//
// --- Single Page Application (SPA) ---
//
// The React app is a "single page application." There is only ONE HTML
// file (index.html). Everything the user sees — opening a modal,
// rendering a list of posts, showing a form — is handled by JavaScript
// editing the DOM on that single page. No new HTML pages are downloaded
// when the user navigates. The initial HTML file contains a <script>
// tag that loads the React bundle, and from there React takes over.
//
// View Page Source in the browser shows just the skeleton HTML; the
// actual rendered content is created dynamically by React at runtime.
//
// --- Running the Backend ---
//
// 1. npm install   — installs Express and other dependencies
// 2. npm start     — starts the server on port 8080
//
// Keep this server running as long as you want the React frontend to
// be able to send and receive data. In production, the frontend and
// backend would typically be deployed to different servers (different
// domains or ports). Here, both run on localhost but on different
// ports to simulate that separation.

// Express is a minimal Node.js web framework that simplifies creating
// HTTP servers and defining API routes (endpoints).
const express = require('express');

// body-parser is middleware that reads incoming request bodies. The
// .json() method parses JSON-encoded request bodies and makes the
// parsed data available as req.body — a plain JavaScript object.
const bodyParser = require('body-parser');

// Import helper functions for reading from and writing to posts.json.
// This acts as a simple stand-in for a real database.
const { getStoredPosts, storePosts } = require('./data/posts');

// Create an Express application instance. This object is used to
// register middleware and route handlers.
const app = express();

// Register body-parser as middleware. Middleware functions run on EVERY
// incoming request before the route handler executes. This one ensures
// that any JSON body sent with a request is automatically parsed.
app.use(bodyParser.json());

// --- CORS (Cross-Origin Resource Sharing) ---
//
// Browsers enforce a security policy called the Same-Origin Policy: by
// default, JavaScript running on one origin (protocol + domain + port)
// cannot make HTTP requests to a DIFFERENT origin. Since the React dev
// server (e.g., localhost:5173) and this backend (localhost:8080) are
// on different ports, they are considered different origins.
//
// Without CORS headers, the browser would BLOCK requests from the React
// app to this backend. The middleware below attaches response headers
// that tell the browser "it's OK for any origin to talk to me":
//   Access-Control-Allow-Origin: *        — allow requests from any domain
//   Access-Control-Allow-Methods: GET,POST — allow these HTTP methods
//   Access-Control-Allow-Headers: Content-Type — allow this request header
//
// next() passes control to the next middleware or route handler in the
// chain. Without calling next(), the request would hang.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// --- REST API Endpoints ---
//
// A REST API organizes its resources around URLs (also called endpoints
// or routes). Each endpoint responds to specific HTTP methods:
//   GET  — read/retrieve data
//   POST — create/submit new data
//
// The combination of method + URL determines what action the server
// takes. Responses are sent as JSON — the standard data format for
// communication between frontend and backend.

// GET /posts — returns all stored posts as a JSON array.
// The React frontend will call this endpoint to load existing posts
// when the application starts (using the fetch API or similar).
app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // This line simulates network latency by adding a 1.5-second delay
  // before sending the response. In production you would never add an
  // artificial delay, but it is useful during development to test how
  // the frontend handles loading states. Without this delay, localhost
  // responses are nearly instant, making it impossible to see loading
  // indicators. Comment this line back out to restore instant responses.
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

// GET /posts/:id — returns a single post identified by its id.
// The :id segment is a route parameter — Express extracts the actual
// value from the URL and makes it available as req.params.id. The
// Array.find() method locates the matching post in the stored array.
app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

// POST /posts — creates a new post.
// The request body (parsed by body-parser) contains the post data sent
// by the React frontend (e.g., { body: "...", author: "..." }). The
// server adds a random id, prepends the new post to the existing array,
// and writes the updated array back to the JSON file. It then responds
// with HTTP 201 (Created) and the new post object.
//
// The spread operator (...postData) copies the incoming fields, then
// the id property is added. This is the same pattern used in the React
// frontend's addPostHandler — the difference is that here it happens
// on the server and gets persisted to a file.
app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

// Start the server and listen for incoming requests on port 8080.
// The React dev server typically runs on a different port (e.g., 5173),
// so the two servers do not conflict. In a deployed environment, these
// would be entirely separate machines or containers.
app.listen(8080);
