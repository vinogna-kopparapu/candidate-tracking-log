import { useState } from 'react';
import { updateApplication, deleteApplication } from '../../services/applications.js';
import { APPLICATION_STATUS } from '../../utils/constants.js';
import '../../styles/applications.css';  

function ApplicationCard({ application, onUpdate, setError }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(application);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    
    if (!editData.company.trim() || !editData.position.trim()) {
      setError('Company and position are required');
      return;
    }

    updateApplication(application.id, editData)
      .then(() => {
        onUpdate();
        setIsEditing(false);
        setError(''); 
      })
      .catch(err => {
        if(err.error === 'auth-missing') {
          setError('Please login first');
        } else if(err.error === 'required-fields') {
          setError('Company and position are required');
        } else if(err.error === 'invalid-company') {
          setError('Company name can only contain letters, numbers, spaces, and basic punctuation');
        } else if(err.error === 'invalid-position') {
          setError('Position can only contain letters, numbers, spaces, and basic punctuation');
        } else if(err.error === 'noSuchId') {
          setError('Application not found');
        } else {
          setError('Failed to update application');
        }
      });
  };

  const handleDelete = () => {
    deleteApplication(application.id)
      .then(() => {
        onUpdate();
        setShowConfirmation(false);
        setError(''); 
      })
      .catch(err => {
        if(err.error === 'auth-missing') {
          setError('Please login first');
        } else if(err.error === 'noSuchId') {
          setError('Application not found');
        } else {
          setError('Failed to delete application');
        }
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [id.split('-')[0]]: value
    }));
  };

  if (isEditing) {
    return (
      <form className="application-card editing" onSubmit={handleUpdate}>
        <label htmlFor={`company-${application.id}`}>Company</label>
        <input
          type="text"
          id={`company-${application.id}`}
          value={editData.company}
          onChange={handleChange}
          placeholder="Company"
        />

        <label htmlFor={`position-${application.id}`}>Position</label>
        <input
          type="text"
          id={`position-${application.id}`}
          value={editData.position}
          onChange={handleChange}
          placeholder="Position"
        />

        <label htmlFor={`status-${application.id}`}>Status</label>
        <select
          id={`status-${application.id}`}
          value={editData.status}
          onChange={handleChange}
        >
          {Object.values(APPLICATION_STATUS).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <label htmlFor={`notes-${application.id}`}>Notes</label>
        <textarea
          id={`notes-${application.id}`}
          value={editData.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => {
            setIsEditing(false);
            setEditData(application); 
            setError(''); 
          }}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <>
      <div className={`application-card ${application.status.toLowerCase()}`}>
        <h3>{application.company}</h3>
        <h4>{application.position}</h4>
        <p>Status: {application.status}</p>
        {application.notes && <p>Notes: {application.notes}</p>}
        <div className="button-group">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => setShowConfirmation(true)}>Delete</button>
        </div>
      </div>

      {showConfirmation && (
        <div className="delete-overlay">
          <div className="delete-popup">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this application for {application.company}?</p>
            <div className="button-group">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => {
                setShowConfirmation(false);
                setError(''); 
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplicationCard;