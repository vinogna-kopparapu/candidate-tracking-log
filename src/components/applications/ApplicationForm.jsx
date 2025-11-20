import { useState } from 'react';
import { addApplication } from '../../services/applications.js';
import { APPLICATION_STATUS } from '../../utils/constants.js';
import { validateApplication } from '../../utils/validators.js';

function ApplicationForm({ onSubmit, setError }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: APPLICATION_STATUS.APPLIED,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateApplication(formData);
    if (!isValid) {
      setError(Object.values(errors)[0]); 
      return;
    }

    addApplication(formData)
      .then(() => {  
        onSubmit();  
        setFormData({
          company: '',
          position: '',
          status: APPLICATION_STATUS.APPLIED,
          notes: ''
        });
        setError(''); 
      })
      .catch(err => {
        if(err.error === 'networkError') {
          setError('Unable to connect to server');
        } else if(err.error === 'auth-missing') {
          setError('Please login first');
        } else if(err.error === 'required-fields') {
          setError('Company and position are required');
        } else if(err.error === 'invalid-company') {
          setError('Company name can only contain letters, numbers, spaces, and basic punctuation');
        } else if(err.error === 'invalid-position') {
          setError('Position can only contain letters, numbers, spaces, and basic punctuation');
        } else {
          setError('Failed to add application');
        }
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <label htmlFor="company">Company</label>
      <input
        id="company"
        type="text"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
      />

      <label htmlFor="position">Position</label>
      <input
        id="position"
        type="text"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={formData.status}
        onChange={handleChange}
      >
        {Object.values(APPLICATION_STATUS).map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
      />

      <button type="submit">Add Application</button>
    </form>
  );
}

export default ApplicationForm;