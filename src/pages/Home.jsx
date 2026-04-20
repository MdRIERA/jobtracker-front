import { useEffect, useState } from 'react'
import { getJobs, getApplications } from '../services/api'

function Home() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const requests = [getJobs()]
        if (!isAdmin) requests.push(getApplications())

        const [jobsData, applicationsData] = await Promise.all(requests)
        setJobs(jobsData)
        if (!isAdmin) setApplications(applicationsData)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [isAdmin])

  const totalJobs = jobs.length
  const totalApplications = applications.length
  const savedCount     = applications.filter(a => a.status === 'guardada').length
  const appliedCount   = applications.filter(a => a.status === 'aplicada').length
  const interviewCount = applications.filter(a => a.status === 'entrevista').length
  const rejectedCount  = applications.filter(a => a.status === 'rechazada').length
  const offerCount     = applications.filter(a => a.status === 'oferta').length

  if (loading) return <p className="loading-state">Cargando dashboard...</p>

  return (
    <div className="home-container">
      <h1>
        {user?.name ? `Hola, ${user.name.split(' ')[0]}` : 'Dashboard'}
      </h1>
      <p className="home-subtitle">
        {isAdmin ? 'Panel de administración' : 'Resumen de tu actividad de búsqueda de empleo'}
      </p>

      {error && <p className="message error-message">{error}</p>}

      <div className="dashboard-grid">
        <div className="dashboard-card card-accent-blue">
          <h3>Empleos disponibles</h3>
          <p>{totalJobs}</p>
        </div>

        {!isAdmin && (
          <>
            <div className="dashboard-card card-accent-primary">
              <h3>Total aplicaciones</h3>
              <p>{totalApplications}</p>
            </div>
            <div className="dashboard-card card-accent-gray">
              <h3>Guardadas</h3>
              <p>{savedCount}</p>
            </div>
            <div className="dashboard-card card-accent-indigo">
              <h3>Aplicadas</h3>
              <p>{appliedCount}</p>
            </div>
            <div className="dashboard-card card-accent-amber">
              <h3>Entrevistas</h3>
              <p>{interviewCount}</p>
            </div>
            <div className="dashboard-card card-accent-red">
              <h3>Rechazadas</h3>
              <p>{rejectedCount}</p>
            </div>
            <div className="dashboard-card card-accent-green">
              <h3>Ofertas</h3>
              <p>{offerCount}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
