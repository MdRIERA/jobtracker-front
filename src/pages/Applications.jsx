import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getApplications, deleteApplication } from '../services/api'
import ApplicationCard from '../components/ApplicationCard'

function Applications() {
  const [applications, setApplications] = useState([])

  const [statusInput, setStatusInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')
  const [positionInput, setPositionInput] = useState('')

  const [statusFilter, setStatusFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [positionFilter, setPositionFilter] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const loadApplications = async () => {
    try {
      setLoading(true)

      const filters = {}

      if (statusFilter) {
        filters.status = statusFilter
      }

      if (companyFilter.trim()) {
        filters.company = companyFilter.trim()
      }

      if (positionFilter.trim()) {
        filters.position = positionFilter.trim()
      }

      const data = await getApplications(filters)
      setApplications(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [statusFilter, companyFilter, positionFilter])

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    if (!successMessage) return

    const timeout = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [successMessage])

  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que quieres borrar esta candidatura?')

    if (!confirmDelete) return

    try {
      await deleteApplication(id)
      setSuccessMessage('Candidatura eliminada correctamente')
      setError('')
      loadApplications()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    setStatusFilter(statusInput)
    setCompanyFilter(companyInput)
    setPositionFilter(positionInput)
  }

  const handleClearFilters = () => {
    setStatusInput('')
    setCompanyInput('')
    setPositionInput('')
    setStatusFilter('')
    setCompanyFilter('')
    setPositionFilter('')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Aplicaciones</h1>
      </div>

      <form onSubmit={handleFilterSubmit} className="filters-box">
        <div className="filters-row">
          <select
            value={statusInput}
            onChange={(event) => setStatusInput(event.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="guardada">Guardada</option>
            <option value="aplicada">Aplicada</option>
            <option value="entrevista">Entrevista</option>
            <option value="rechazada">Rechazada</option>
            <option value="oferta">Oferta</option>
          </select>
          <input
            type="text"
            placeholder="Empresa"
            value={companyInput}
            onChange={(event) => setCompanyInput(event.target.value)}
          />
          <input
            type="text"
            placeholder="Puesto"
            value={positionInput}
            onChange={(event) => setPositionInput(event.target.value)}
          />
        </div>
        <div className="filter-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="secondary-button" onClick={handleClearFilters}>
            Limpiar
          </button>
        </div>
      </form>

      {successMessage && <p className="message success-message">{successMessage}</p>}
      {error && <p className="message error-message">{error}</p>}

      {loading && <p className="loading-state">Cargando aplicaciones...</p>}

      {!loading && applications.length === 0 && (
        <p className="empty-state">No hay candidaturas para esos filtros.</p>
      )}

      <div className="cards-grid">
        {applications.map((application) => (
          <ApplicationCard
            key={application._id}
            application={application}
            onDeleteApplication={handleDeleteApplication}
          />
        ))}
      </div>
    </div>
  )
}

export default Applications