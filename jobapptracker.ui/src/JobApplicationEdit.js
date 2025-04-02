import React, { useState } from 'react';
import axios from 'axios';

// FUNCTIONAL COMPONENT: JobApplicationEdit
// Props:
//   - application: The job application to edit
//   - onClose: Callback to close the edit modal
//   - onUpdate: Callback to refresh the application list after update
const JobApplicationEdit = ({ application, onClose, onUpdate}) => {
    // useState HOOK: Manage local state for the updated status
    const [newStatus, setNewStatus] = useState(application.status);
    
    // EVENT HANDLER FUNCTION: handleUpdate
    // - Sends a PUT request to update the application's status
    // - Calls onUpdate with the response data and closes the modal
    const handleUpdate = () => { 
        axios.put(`https://localhost:5001/applications/${application.id}/status`, newStatus,
            { headers: { "Content-Type": "application/json" } }
          )
            .then(response => {
                onUpdate(response.data); // Refresh parent data with new info
                onClose(); // Exit edit mode (close modal)
            
            })
            .catch(error => {
                console.error('Error updating application:', error);

            });
    };
    return (
        <div className="edit-modal">
          <h2>Edit Application Status</h2>
          {/* Dropdown to select new status */}
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="button-row">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
    );
};

export default JobApplicationEdit;