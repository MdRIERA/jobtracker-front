import { useEffect, useState } from 'react'

function ApplicationForm({
  onSubmitApplication,
  initialData = {},
  isEditing = false,
  jobs = []
}) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'guardada',
    appliedAt: '',
    notes: '',
    contactPerson: '',
    job: ''
  })

  useEffect(() => {
    setFormData({
      company: initialData.company || '',
      position: initialData.position || '',
      status: initialData.status || 'guardada',
      appliedAt: initialData.appliedAt ? initialData.appliedAt.slice(0, 10) : '',
      notes: initialData.notes || '',
      contactPerson: initialData.contactPerson || '',
      job: initialData.job?._id || initialData.job || ''
    })
  }, [initialData])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.company.trim() || !formData.position.trim()) {
      alert('company y position son obligatorios')
      return
    }

    onSubmitApplication(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        placeholder="Empresa"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="position"
        placeholder="Puesto"
        value={formData.position}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="guardada">Guardada</option>
        <option value="aplicada">Aplicada</option>
        <option value="entrevista">Entrevista</option>
        <option value="rechazada">Rechazada</option>
        <option value="oferta">Oferta</option>
      </select>

      <select
        name="job"
        value={formData.job}
        onChange={handleChange}
      >
        <option value="">Sin job asociado</option>
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title} - {job.company}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="appliedAt"
        value={formData.appliedAt}
        onChange={handleChange}
      />

      <input
        type="text"
        name="contactPerson"
        placeholder="Persona de contacto"
        value={formData.contactPerson}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notas"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit">
        {isEditing ? 'Guardar cambios' : 'Crear application'}
      </button>
    </form>
  )
}

export default ApplicationForm