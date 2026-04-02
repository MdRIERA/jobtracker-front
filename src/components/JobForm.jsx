import { useState, useEffect } from 'react'

function JobForm({ onSubmitJob, initialData = {}, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    url: '',
    source: '',
    salary: ''
  })

  useEffect(() => {
    setFormData({
      title: initialData.title || '',
      company: initialData.company || '',
      location: initialData.location || '',
      description: initialData.description || '',
      url: initialData.url || '',
      source: initialData.source || '',
      salary: initialData.salary || ''
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

    if (!formData.title.trim() || !formData.company.trim()) {
      alert('title y company son obligatorios')
      return
    }

    onSubmitJob(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título del puesto"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Empresa"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Ubicación"
        value={formData.location}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="url"
        placeholder="URL de la oferta"
        value={formData.url}
        onChange={handleChange}
      />

      <input
        type="text"
        name="source"
        placeholder="Fuente"
        value={formData.source}
        onChange={handleChange}
      />

      <input
        type="text"
        name="salary"
        placeholder="Salario"
        value={formData.salary}
        onChange={handleChange}
      />

      <button type="submit">
        {isEditing ? 'Guardar cambios' : 'Crear job'}
      </button>
    </form>
  )
}

export default JobForm