import ApplicationCard from './ApplicationCard';
import '../../styles/applications.css';

function ApplicationList({ applications, onUpdate, setError }) {
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
  );

  return (
    <div className="applications-list">
      {sortedApplications.length === 0 ? (
        <p>No applications yet. Start by adding one!</p>
      ) : (
        sortedApplications.map(app => (
          <ApplicationCard
            key={app.id}
            application={app}
            onUpdate={onUpdate}
            setError={setError}
          />
        ))
      )}
    </div>
  );
}

export default ApplicationList;