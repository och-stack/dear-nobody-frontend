import { useEffect, useState } from 'react'
import { useAuth } from '../context/login'
import { ENDPOINTS } from '../App'

export default function Feed() {
  const { apiFetch } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState('')
  const [posting, setPosting] = useState(false)

  function loadPosts() {
    return apiFetch(ENDPOINTS.posts)
      .then((data) =>
        setPosts(Array.isArray(data) ? data : data.posts || [])
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function handlePost(e) {
    e.preventDefault()
    setError('')

    if (!content.trim()) {
      return setError('Write something first')
    }

    if (!visibility) {
      return setError('Choose Public or Friends only')
    }

    setPosting(true)

    try {
      await apiFetch(ENDPOINTS.createPost, {
        method: 'POST',
        body: JSON.stringify({
          content,
          visibility,
        }),
      })

      setContent('')
      setVisibility('')
      await loadPosts()
    } catch (err) {
      setError(err.message)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">

        {/* Feed Heading */}

        <div className="d-flex align-items-center gap-2 mb-4">
          <img
            src="/clover.png"
            alt="Clover"
            width="30"
            height="30"
            style={{ objectFit: 'contain' }}
          />

          <h1 className="feed-title mb-0">
            Feed
          </h1>
        </div>

        {/* Create Post */}

        <div className="card create-post shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">
              Create a post
            </h5>

            <form onSubmit={handlePost}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <label className="form-label d-block">
                  Who can see this?
                </label>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={visibility === 'Public'}
                    onChange={(e) => setVisibility(e.target.value)}
                  />

                  <label className="form-check-label">
                    Public
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value="Friends-only"
                    checked={visibility === 'Friends-only'}
                    onChange={(e) => setVisibility(e.target.value)}
                  />

                  <label className="form-check-label">
                    Friends only
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={posting}
              >
                {posting ? 'Posting...' : 'Post'}
              </button>
            </form>
          </div>
        </div>

        {/* Listening Corner */}

        <h5 className="listening-title mb-3">
          Listening Corner
        </h5>

        {/* Error */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <p className="text-muted">
            Loading posts...
          </p>
        )}

        {/* Empty State */}

        {!loading && posts.length === 0 && (
          <div className="empty-state">
            No posts yet.
          </div>
        )}

        {/* Posts */}

        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              className={`card post-card shadow-sm ${post.visibility === 'Friends-only'
                ? 'protected-post'
                : ''
                }`}
            >
              <div className="card-body">
                <p className="post-content">
                  {post.content}
                </p>

                <small className="post-meta">
                  {post.username}

                  {post.created_at &&
                    ` · ${new Date(
                      post.created_at
                    ).toLocaleString()}`}
                </small>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  )
}