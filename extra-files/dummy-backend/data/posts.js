// --- File-Based Data Persistence ---
//
// This module handles reading from and writing to posts.json, which
// serves as a simple stand-in for a database. In a real application,
// you would typically use a database (PostgreSQL, MongoDB, etc.)
// instead of a JSON file, but the concept is the same: the backend
// stores data in durable storage so it survives server restarts and
// page reloads, unlike React state which lives only in browser memory.
//
// Node.js provides a built-in "fs" (filesystem) module for file
// operations. The "node:fs/promises" variant returns Promises, which
// allows us to use async/await for cleaner asynchronous code.

const fs = require('node:fs/promises');

// Reads the posts.json file, parses its JSON content into a JavaScript
// object, and returns the posts array. The ?? (nullish coalescing)
// operator ensures an empty array is returned if the posts property is
// null or undefined — for example, if the file is empty or has no
// posts key. This prevents the API from crashing on missing data.
async function getStoredPosts() {
  const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

// Writes the given posts array to posts.json, overwriting the previous
// content. JSON.stringify converts the JavaScript object back into a
// JSON string for storage. The || [] fallback ensures an empty array
// is written if posts is falsy, preventing corrupted file content.
function storePosts(posts) {
  return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

// CommonJS exports make these functions available to other files via
// require(). This is the Node.js module system — different from the
// ES module "import/export" syntax used in the React frontend. Both
// achieve the same goal of sharing code between files.
exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;
