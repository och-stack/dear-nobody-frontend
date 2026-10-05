import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/login'
import Signup from './pages/signup'
import Login from './pages/login'
import Feed from './pages/feed'
import Friends from './pages/friends'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

export const ENDPOINTS = {
  signup: 'https://dear-nobody-api-production.up.railway.app/signup',
  login: 'https://dear-nobody-api-production.up.railway.app/login',
  posts: 'https://dear-nobody-api-production.up.railway.app/posts',
  createPost: 'https://dear-nobody-api-production.up.railway.app/posts',
  users: 'https://dear-nobody-api-production.up.railway.app/users',
  friends: 'https://dear-nobody-api-production.up.railway.app/friends',
=======

export const ENDPOINTS = {
  // signup: `${API_URL}/signup`, // POST { email, password, username }
  signup: 'http://localhost:3000/signup',
  // login: `${API_URL}/login`, // POST { email, password } -> token
  login: 'http://localhost:3000/login',
  // posts: `${API_URL}/posts`, // GET public + friends' posts
  posts: 'http://localhost:3000/posts',
  // createPost: `${API_URL}/posts`, // POST { title, content, visibility } -> new post
  createPost: 'http://localhost:3000/posts',
  // users: `${API_URL}/users`, // GET all users
  users: 'http://localhost:3000/users',
  // friends: `${API_URL}/friends`, // POST { friend_id } -> follow a user
  friends: 'http://localhost:3000/friends',
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
}

function RequireAuth({ children }) {
  const { token } = useAuth()
<<<<<<< HEAD

=======
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
  return token ? children : <Navigate to="/login" replace />
}

function GuestOnly({ children }) {
  const { token } = useAuth()
<<<<<<< HEAD

=======
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
  return token ? <Navigate to="/feed" replace /> : children
}

function Nav() {
  const { token, logout } = useAuth()
<<<<<<< HEAD

  if (!token) {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/login"
          >
            <img
              src="/love-letter.png"
              alt="Love letter"
              width="28"
              height="28"
              style={{ objectFit: 'contain' }}
            />
            Dear Nobody
          </Link>

          <div>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-light" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/feed"
        >
          <img
            src="/love-letter.png"
            alt="Love letter"
            width="28"
            height="28"
            style={{ objectFit: 'contain' }}
          />
          Dear Nobody
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/feed">
            Feed
          </Link>

          <Link className="btn btn-outline-light me-2" to="/friends">
            Friends
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
=======
  if (!token) {
    return (
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign up</Link>
      </nav>
    )
  }
  return (
    <nav>
      <Link to="/feed">Feed</Link> | <Link to="/friends">Friends</Link> |{' '}
      <button onClick={logout}>Log out</button>
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
<<<<<<< HEAD

        <div className="container py-4">
          <Routes>
            <Route
              path="/signup"
              element={
                <GuestOnly>
                  <Signup />
                </GuestOnly>
              }
            />

            <Route
              path="/login"
              element={
                <GuestOnly>
                  <Login />
                </GuestOnly>
              }
            />

            <Route
              path="/feed"
              element={
                <RequireAuth>
                  <Feed />
                </RequireAuth>
              }
            />

            <Route
              path="/friends"
              element={
                <RequireAuth>
                  <Friends />
                </RequireAuth>
              }
            />

            <Route
              path="*"
              element={<Navigate to="/feed" replace />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
=======
        <hr />
        <Routes>
          <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
          <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
          <Route path="/feed" element={<RequireAuth><Feed /></RequireAuth>} />
          <Route path="/friends" element={<RequireAuth><Friends /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
