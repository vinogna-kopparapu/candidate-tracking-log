import { useState, useEffect } from 'react';
import ApplicationList from '../applications/ApplicationList';
import ApplicationForm from '../applications/ApplicationForm';
import Statistics from './Statistics';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import Header from '../common/Header';
import * as applicationsService from '../../services/applications.js';
import * as authService from '../../services/auth.js';
import { APPLICATION_STATUS } from '../../utils/constants.js';
import '../../styles/dashboard.css';

function Dashboard({ username, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    setLoading(true);
    applicationsService.getApplications()
      .then(data => {
        setApplications(data);
        setError('');
      })
      .catch(err => {
        setError('Failed to load applications');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        onLogout();
      })
      .catch(err => {
        setError('Failed to logout');
      });
  };

  const getFilteredApplications = () => {
    let filtered = applications;

    
    if (currentFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === currentFilter);
    }

    
    if (searchQuery.trim()) {
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="dashboard">
      <Header username={username} onLogout={handleLogout} />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <div className="dashboard-content">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name..."
              className="company-search"
            />
          </div>
          <div className="status-filter">
            <label>
              Filter by Status:
              <select 
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value)}
                className="status-filter"
              >
                <option value="ALL">All Applications</option>
                {Object.values(APPLICATION_STATUS).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <button 
          className="add-application-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Application'}
        </button>

        {showAddForm && (
          <ApplicationForm
            onSubmit={() => {
              loadApplications();
              setShowAddForm(false);
            }}
            setError={setError}
          />
        )}

        <Statistics applications={applications} />
        
        <ApplicationList 
          applications={getFilteredApplications()}
          onUpdate={loadApplications}
          setError={setError}
        />
      </div>
    </div>
  );
}

export default Dashboard;