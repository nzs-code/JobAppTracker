import React, { useState, useEffect } from 'react'; // Import React and its hooks: useState (for state) and useEffect (for side effects)
import axios from 'axios'; // Axios: Library to handle HTTP requests
import JobApplicationForm from './JobApplicationForm'; // Import child component: JobApplicationForm
import JobApplicationList from './JobApplicationList'; // Import child component: JobApplicationList
import './JobApplicationPage.css'; // Import CSS for styling

// COMPONENT: JobApplicationPage
// - Functional Component (a reusable UI block)
// - Acts as a container for the form and list of applications
const JobApplicationPage = () => {

  // useState HOOK: Manages component state
  // 'applications' holds an array of job applications fetched from the backend
  // setApplications populates applications with data after the axios.get
  const [applications, setApplications] = useState([]);

  // FUNCTION: refreshApplications
  // - Updates the 'applications' state with the fetched data
  const refreshApplications = () => {
    axios.get('https://localhost:5001/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  };

  // useEffect HOOK: Runs side effects after component mounts
  // - It fetches data once on render 
  useEffect(() => {
    refreshApplications(); // Fetch data when component is first rendered
  }, []); // Empty dependency array means this effect runs only once

  // Renders the Form and List components.
  // Passes 'applications' data down to the List component.
  return (
    <div>
      {/* Child Component: JobApplicationForm */}
      {/* PROPS - onApplicationAdded passes 'refreshApplications' to children so they can trigger data refresh. */}
      <JobApplicationForm onApplicationAdded={refreshApplications} />
      {/* Child Component: JobApplicationList */}
      {/* PROPS - applications, onApplicationEdited passes:
      'applications' data and an edit callback 'onApplicationEdited' */}
     <JobApplicationList 
        applications={applications}
        onApplicationEdited={refreshApplications} />
    </div>
  );
};

// export default: Makes JobApplicationPage available for import in other parts of the app
export default JobApplicationPage;
