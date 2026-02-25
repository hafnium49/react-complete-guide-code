// --- PostDetails: Dynamic Route with Loader ---
//
// This route component displays the details of a SINGLE post, identified
// by an ID extracted from the URL. It appears as a modal overlay on top
// of the posts list — the same overlay pattern used by NewPost.
//
// The component relies entirely on a loader to fetch the post data
// before rendering. It uses useLoaderData to access the loaded post
// and handles the case where no post is found for the given ID by
// showing a fallback message inside the modal.
//
// Because this is a route component (rendered by React Router based on
// the URL), it lives in the routes/ folder alongside Posts, NewPost,
// and RootLayout.

import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

// --- Loader with Dynamic Route Parameters ---
//
// This loader fetches a single post from the backend using the post's
// ID. The ID comes from the URL — for example, visiting /abc123 means
// the loader should fetch the post with ID "abc123".
//
// React Router passes an object to every loader function. This object
// contains two important properties:
//
//   request — a Request object representing the navigation (the same
//     kind of object that action functions receive)
//
//   params  — an object containing the dynamic segments from the URL.
//     The KEYS on this object correspond to the placeholder names in
//     the route definition. Since the route path is "/:id", the params
//     object has an "id" property whose value is whatever appeared in
//     the URL at that position. If the route path used ":postId"
//     instead, you would access params.postId.
//
// This params object is also available to action functions, not just
// loaders. Any route with a dynamic segment can access the concrete
// value through params.
export async function loader({ params }) {
  const response = await fetch('http://localhost:8080/posts/' + params.id);
  const resData = await response.json();
  // The backend's GET /posts/:id endpoint returns { post: { ... } }
  // or { post: undefined } if no post matches. Returning undefined
  // here is fine — the component checks for it and shows a fallback.
  return resData.post;
}

// --- PostDetails Component ---
//
// The component reads the single post object from useLoaderData. If
// the loader returned undefined (no post found for the given ID), a
// fallback UI is shown with a Link back to the parent route. If a
// post was found, its author and body text are displayed.
//
// Both branches are wrapped in a Modal, so the details always appear
// as an overlay on top of the posts list — just like NewPost. Clicking
// the backdrop navigates back to the parent route (the posts list),
// closing the modal.
function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            {/* Link to ".." navigates to the parent route (the posts
                list), closing the modal overlay. */}
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;
