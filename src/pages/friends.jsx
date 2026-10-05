import { useEffect, useState } from 'react'
import { useAuth } from '../context/login'
import { ENDPOINTS } from '../App'

export default function Friends() {
  const { apiFetch } = useAuth()
  const [users, setUsers] = useState([])
  const [followed, setFollowed] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch(ENDPOINTS.users)
      .then((data) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch((err) => setError(err.message))
  }, [])

  async function follow(userId) {
    setError('')

    try {
      await apiFetch(ENDPOINTS.friends, {
        method: 'POST',
        body: JSON.stringify({ friend_id: userId }),
      })

      setFollowed({ ...followed, [userId]: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">

        {/* Friends Heading */}

        <div className="d-flex align-items-center gap-2 mb-4">
          <img
            src="/root.png"
            alt="Root"
            width="30"
            height="30"
            style={{ objectFit: 'contain' }}
          />

          <h1 className="mb-0">
            Friends
          </h1>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="card friends-card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">
              Meet a Listener
            </h5>

            <ul className="list-group list-group-flush friends-list">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="list-group-item friend-item d-flex justify-content-between align-items-center"
                >
                  <span className="friend-name">
                    {user.username || user.email}
                  </span>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => follow(user.id)}
                    disabled={followed[user.id]}
                  >
                    {followed[user.id] ? 'Following' : 'Follow'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
=======
import { useEffect, useState } from 'react'
import { useAuth } from '../context/login'
import { ENDPOINTS } from '../App'

export default function Friends() {
  const { apiFetch } = useAuth()
  const [users, setUsers] = useState([])
  const [followed, setFollowed] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch(ENDPOINTS.users)
      .then((data) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch((err) => setError(err.message))
  }, [])

  async function follow(userId) {
    setError('')
    try {
      await apiFetch(ENDPOINTS.friends, {
        method: 'POST',
        body: JSON.stringify({ friend_id: userId }),
      })
      setFollowed({ ...followed, [userId]: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1>Friends</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username || user.email}{' '}
            <button onClick={() => follow(user.id)} disabled={followed[user.id]}>
              {followed[user.id] ? 'Following' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
>>>>>>> 2043396a7da4e4fa441774c15712e10faf2720d0
