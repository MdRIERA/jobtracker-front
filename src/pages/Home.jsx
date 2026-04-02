import { useEffect, useState } from 'react'
import { getJobs, getApplications } from '../services/api'

function Home() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)

        const jobsData = await getJobs()
        const applicationsData = await getApplications()

        setJobs(jobsData)
        setApplications(applicationsData)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const totalJobs = jobs.length
  const totalApplications = applications.length

  const savedCount = applications.filter(
    (application) => application.status === 'guardada'
  ).length

  const appliedCount = applications.filter(
    (application) => application.status === 'aplicada'
  ).length

  const interviewCount = applications.filter(
    (application) => application.status === 'entrevista'
  ).length

  const rejectedCount = applications.filter(
    (application) => application.status === 'rechazada'
  ).length

  const offerCount = applications.filter(
    (application) => application.status === 'oferta'
  ).length

  if (loading) return <p>Cargando dashboard...</p>

  return (
    <div className="home-container">
      <h1>Dashboard</h1>

      {error && <p>{error}</p>}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total jobs</h3>
          <p>{totalJobs}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="dashboard-card">
          <h3>Guardadas</h3>
          <p>{savedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Aplicadas</h3>
          <p>{appliedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Entrevistas</h3>
          <p>{interviewCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Rechazadas</h3>
          <p>{rejectedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Ofertas</h3>
          <p>{offerCount}</p>
        </div>
      </div>
    </div>
  )
}

export default Home