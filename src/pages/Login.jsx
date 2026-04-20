import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { loginUser } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  if (token) {
    return <Navigate to="/home" />
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const data = await loginUser(formData)

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setError('')
      navigate('/home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="form-card">
        <h1>Bienvenido</h1>
        <p className="form-subtitle">Accede a tu cuenta para continuar</p>

        <button
          type="button"
          className="demo-button"
          onClick={() => setFormData({ email: 'martin@martin.com', password: '12345' })}
        >
          Usar credenciales de demo
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Iniciar sesión</button>
        </form>

        {error && <p className="message error-message">{error}</p>}

        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}

export default Login