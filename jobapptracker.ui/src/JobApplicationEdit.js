import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationEdit = ({ application, onClose, onUpdate}) => {

    const [newStatus, setNewStatus] = useState(application.status);

    const handleUpdate = () => { 
        axios.put(`https://localhost:5001/applications/${application.id}/status`, newStatus,
            { headers: { "Content-Type": "application/json" } }
          )
            .then(response => {
                onUpdate(response.data);
                onClose();
            
            })
            .catch(error => {
                console.error('Error updating application:', error);

            });
    };
    return (
        <div className="edit-modal">
          <h2>Edit Application Status</h2>
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