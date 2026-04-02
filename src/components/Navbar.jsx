import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')

  const isAuthPage =
    location.pathname === '/' || location.pathname === '/register'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav>
      <h2>JobTracker</h2>

      {!isAuthPage && token && (
        <div>
          <Link to="/home">Home</Link>
          {' | '}
          <Link to="/jobs">Jobs</Link>
          {' | '}
          <Link to="/applications">Applications</Link>
          {' | '}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar