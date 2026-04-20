import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import {
  createApplication,
  updateApplication,
  getApplicationById,
  getJobs
} from '../services/api'

function ApplicationFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [application, setApplication] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const jobsData = await getJobs()
        setJobs(jobsData)

        if (isEditing) {
          const applicationData = await getApplicationById(id)
          setApplication(applicationData)
        }

        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, isEditing])

  const handleSubmitApplication = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        job: formData.job || null
      }

      if (isEditing) {
        await updateApplication(id, dataToSend)
        navigate('/applications', {
          state: { successMessage: 'Candidatura actualizada correctamente' }
        })
      } else {
        await createApplication(dataToSend)
        navigate('/applications', {
          state: { successMessage: 'Candidatura creada correctamente' }
        })
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Cargando formulario...</p>

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>{isEditing ? 'Editar candidatura' : 'Nueva candidatura'}</h1>

        {error && <p className="message error-message">{error}</p>}

        <ApplicationForm
          onSubmitApplication={handleSubmitApplication}
          initialData={application || {}}
          isEditing={isEditing}
          jobs={jobs}
        />
      </div>
    </div>
  )
}

export default ApplicationFormPage