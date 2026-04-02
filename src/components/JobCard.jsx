import { Link } from 'react-router-dom'

function JobCard({ job, onDeleteJob, alreadyApplied, onApplyToJob }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin

  return (
    <div className="card">
      <div className="card-header">
        <h3>{job.title}</h3>
        <span className="card-badge company-badge">{job.company}</span>
      </div>

      <div className="job-tags">
        {job.location && <span className="info-tag">{job.location}</span>}
        {job.source && <span className="info-tag source-tag">{job.source}</span>}
        {job.salary && <span className="info-tag salary-tag">{job.salary}</span>}
      </div>

      <div className="card-body">
        {job.description && (
          <p><strong>Descripción:</strong> {job.description}</p>
        )}

        {job.url && (
          <p>
            <strong>URL:</strong>{' '}
            <a href={job.url} target="_blank" rel="noreferrer">
              Ver oferta
            </a>
          </p>
        )}
      </div>

      <div className="card-actions">
        {isAdmin ? (
          <>
            <Link to={`/jobs/edit/${job._id}`}>
              <button>Actualizar</button>
            </Link>

            <button onClick={() => onDeleteJob(job._id)} className="danger-button">
              Borrar
            </button>
          </>
        ) : alreadyApplied ? (
          <button disabled className="disabled-button">
            Ya aplicada
          </button>
        ) : (
          <button onClick={() => onApplyToJob(job._id)}>Aplicar</button>
        )}
      </div>
    </div>
  )
}

export default JobCard