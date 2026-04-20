import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobs, getApplications, deleteJob, applyToJob } from '../services/api'
import JobCard from '../components/JobCard'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [companyInput, setCompanyInput] = useState('')
  const [titleInput, setTitleInput] = useState('')

  const [companyFilter, setCompanyFilter] = useState('')
  const [titleFilter, setTitleFilter] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError('')

      const filters = {}

      if (companyFilter.trim()) {
        filters.company = companyFilter.trim()
      }

      if (titleFilter.trim()) {
        filters.title = titleFilter.trim()
      }

      const jobsData = await getJobs(filters)
      setJobs(jobsData)

      if (!isAdmin) {
        try {
          const applicationsData = await getApplications()
          setApplications(applicationsData)
        } catch {
          setApplications([])
        }
      } else {
        setApplications([])
      }
    } catch (err) {
      setError(err.message)
      setJobs([])
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [companyFilter, titleFilter, isAdmin])

  useEffect(() => {
    if (!successMessage) return

    const timeout = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [successMessage])

  const handleDeleteJob = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que quieres borrar esta oferta?')

    if (!confirmDelete) return

    try {
      await deleteJob(id)
      setSuccessMessage('Oferta eliminada correctamente')
      await loadJobs()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleApplyToJob = async (jobId) => {
    try {
      await applyToJob(jobId)
      setSuccessMessage('Te has apuntado a la oferta correctamente')
      await loadJobs()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    setCompanyFilter(companyInput)
    setTitleFilter(titleInput)
  }

  const handleClearFilters = () => {
    setCompanyInput('')
    setTitleInput('')
    setCompanyFilter('')
    setTitleFilter('')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Empleos</h1>

        {isAdmin && (
          <Link to="/jobs/new">
            <button>Crear nueva oferta</button>
          </Link>
        )}
      </div>

      <form onSubmit={handleFilterSubmit} className="filters-box">
        <div className="filters-row">
          <input
            type="text"
            placeholder="Empresa"
            value={companyInput}
            onChange={(event) => setCompanyInput(event.target.value)}
          />
          <input
            type="text"
            placeholder="Puesto"
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
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

      {loading && <p className="loading-state">Cargando empleos...</p>}

      {!loading && jobs.length === 0 && !error && (
        <p className="empty-state">No hay ofertas para esos filtros.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="cards-grid">
          {jobs.map((job) => {
            const alreadyApplied = !isAdmin && applications.some(
              (application) =>
                application.job &&
                (application.job._id === job._id || application.job === job._id)
            )

            return (
              <JobCard
                key={job._id}
                job={job}
                onDeleteJob={handleDeleteJob}
                alreadyApplied={alreadyApplied}
                onApplyToJob={handleApplyToJob}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Jobs