import { Link } from 'react-router-dom'

function ApplicationCard({ application, onDeleteApplication }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'guardada':
        return 'status-guardada'
      case 'aplicada':
        return 'status-aplicada'
      case 'entrevista':
        return 'status-entrevista'
      case 'rechazada':
        return 'status-rechazada'
      case 'oferta':
        return 'status-oferta'
      default:
        return ''
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{application.position}</h3>
        <span className={`card-badge status-badge ${getStatusClass(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="card-body">
        <p><strong>Empresa:</strong> {application.company}</p>

        {application.job && (
          <p>
            <strong>Job asociado:</strong> {application.job.title} - {application.job.company}
          </p>
        )}

        {application.contactPerson && (
          <p><strong>Contacto:</strong> {application.contactPerson}</p>
        )}

        {application.notes && (
          <p><strong>Notas:</strong> {application.notes}</p>
        )}

        {application.appliedAt && (
          <p>
            <strong>Fecha:</strong> {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="card-actions">
        <Link to={`/applications/edit/${application._id}`}>
          <button>Actualizar</button>
        </Link>

        <button
          onClick={() => onDeleteApplication(application._id)}
          className="danger-button"
        >
          Borrar
        </button>
      </div>
    </div>
  )
}

export default ApplicationCard