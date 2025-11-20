function Statistics({ applications }) {
 
  const stats = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="statistics">
      <h2>Application Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total</h3>
          <p>{applications.length}</p>
        </div>
        <div className="stat-card">
          <h3>Applied</h3>
          <p>{stats.APPLIED || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Interview</h3>
          <p>{stats.INTERVIEW || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Offer</h3>
          <p>{stats.OFFER || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{stats.REJECTED || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;