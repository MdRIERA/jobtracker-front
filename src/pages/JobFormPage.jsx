import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import JobForm from '../components/JobForm'
import { createJob, updateJob, getJobById } from '../services/api'

function JobFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(isEditing)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadJob = async () => {
      if (!isEditing) return

      try {
        setLoading(true)
        const data = await getJobById(id)
        setJob(data)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id, isEditing])

  const handleSubmitJob = async (formData) => {
    try {
      if (isEditing) {
        await updateJob(id, formData)
        navigate('/jobs', {
          state: { successMessage: 'Oferta actualizada correctamente' }
        })
      } else {
        await createJob(formData)
        navigate('/jobs', {
          state: { successMessage: 'Oferta creada correctamente' }
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
        <h1>{isEditing ? 'Editar job' : 'Crear job'}</h1>

        {error && <p className="message error-message">{error}</p>}

        <JobForm
          onSubmitJob={handleSubmitJob}
          initialData={job || {}}
          isEditing={isEditing}
        />
      </div>
    </div>
  )
}

export default JobFormPage