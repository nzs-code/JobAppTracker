import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobApplicationForm from './JobApplicationForm';
import JobApplicationList from './JobApplicationList';
import './JobApplicationPage.css';

const JobApplicationPage = () => {
  const [applications, setApplications] = useState([]);

  const refreshApplications = () => {
    axios.get('https://localhost:5001/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  };

  useEffect(() => {
    refreshApplications();
  }, []);

  return (
    <div>
      <JobApplicationForm onApplicationAdded={refreshApplications} />
      <JobApplicationList 
        applications={applications}
        onApplicationEdited={refreshApplications} />
    </div>
  );
};

export default JobApplicationPage;
