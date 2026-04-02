const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token')

const getAuthHeaders = (isJson = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`
  }

  if (isJson) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

const handleResponse = async (response, defaultMessage) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || defaultMessage)
  }

  return data
}

// AUTH
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return handleResponse(response, 'Error al registrar usuario')
}

export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return handleResponse(response, 'Credenciales incorrectas')
}

export const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al obtener perfil')
}

// JOBS
export const getJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams()

  if (filters.company) {
    queryParams.append('company', filters.company)
  }

  if (filters.title) {
    queryParams.append('title', filters.title)
  }

  const url = `${BASE_URL}/jobs${
    queryParams.toString() ? `?${queryParams.toString()}` : ''
  }`

  const response = await fetch(url, {
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al obtener jobs')
}

export const getJobById = async (id) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al obtener job')
}

export const createJob = async (jobData) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(jobData)
  })

  return handleResponse(response, 'Error al crear job')
}

export const updateJob = async (id, jobData) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(jobData)
  })

  return handleResponse(response, 'Error al actualizar job')
}

export const deleteJob = async (id) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al eliminar job')
}

// APPLICATIONS
export const getApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams()

  if (filters.status) {
    queryParams.append('status', filters.status)
  }

  if (filters.company) {
    queryParams.append('company', filters.company)
  }

  if (filters.position) {
    queryParams.append('position', filters.position)
  }

  const url = `${BASE_URL}/applications${
    queryParams.toString() ? `?${queryParams.toString()}` : ''
  }`

  const response = await fetch(url, {
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al obtener applications')
}

export const getApplicationById = async (id) => {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al obtener application')
}

export const createApplication = async (applicationData) => {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(applicationData)
  })

  return handleResponse(response, 'Error al crear application')
}

export const updateApplication = async (id, applicationData) => {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(applicationData)
  })

  return handleResponse(response, 'Error al actualizar application')
}

export const deleteApplication = async (id) => {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  return handleResponse(response, 'Error al eliminar application')
}

// PARA EL SIGUIENTE PASO: aplicar desde un job
export const applyToJob = async (jobId) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/applications/from-job/${jobId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error al aplicar a la oferta')
  }

  return data
}