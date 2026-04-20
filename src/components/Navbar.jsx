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

  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <nav>
      <Link to="/home" className="nav-brand">
        <span className="nav-brand-dot" />
        JobTracker
      </Link>

      {!isAuthPage && token && (
        <div className="nav-links">
          <Link to="/home" className={isActive('/home')}>Inicio</Link>
          <Link to="/jobs" className={isActive('/jobs')}>Empleos</Link>
          {!isAdmin && (
            <Link to="/applications" className={isActive('/applications')}>Aplicaciones</Link>
          )}
          <div className="nav-divider" />
          <button className="nav-logout" onClick={handleLogout}>Salir</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
