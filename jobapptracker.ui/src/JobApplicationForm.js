import React, { useState } from 'react';
import axios from 'axios';
import './JobApplicationPage.css';

// Component: JobApplicationForm
// Purpose: Collect job application details and submit them to a backend API.
// Props: onApplicationAdded - a callback to update the parent component when a new application is added.
const JobApplicationForm = ( {onApplicationAdded} ) => {
    // HOOK useState: Manages local form state
    
    const [companyName, setCompanyName] = useState('');     // Text input for company name.
    const [position, setPosition] = useState('');           // Text input for position.
    const [status, setStatus] = useState('');               // Dropdown for application status.
    const [dateApplied, setDateApplied] = useState('');     // Date input for application date.

    // Date Constraints: define minimum and maximum valid dates.
    const today = new Date().toISOString().split("T")[0];   // Current date in YYYY-MM-DD format.
    const twoYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
      .toISOString()
      .split("T")[0];   // Date two years ago in YYYY-MM-DD format.


    // EVENT HANDLER FUNCTION: handleSubmit
    // - Triggered on form submission.
    // - Prevents the default form action.
    // - Builds an application object from state.
    // - Sends a POST request via axios.
    // - Clears form inputs and calls the parent callback on success.
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop default form behavior.

        // Construct application object from state.
        const newApplication = { companyName, position, status, dateApplied };

        // POST request to backend API.
        axios.post('https://localhost:5001/applications', newApplication)
            .then(response => {
                console.log('Application added:', response.data);
                // Clear all form fields after a successful request.
                setCompanyName('');
                setPosition('');
                setStatus('');
                setDateApplied('');
                // Call parent function if provided.
                if (onApplicationAdded) onApplicationAdded();
        })
            .catch(error => {
                console.error('Error adding application:', error);
        });
    };

    // Render the form UI.
    return (
        <div className="form-container">
            <h2>Create Application</h2>
            <form onSubmit={handleSubmit}>
                {/* Company Name Field */}
                <div>
                    <label>Company Name:</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

                </div>
                {/* Position Field */}
                <div>
                    <label>Position:</label>
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    
                </div>
                {/* Status Dropdown */}
                <div>
                    <label>Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} required >
                        
                        <option value="">-- Select Status --</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                {/* Date Applied Field */}
                <div>
                    <label>Date Applied:</label>
                    <input 
                        type="date" 
                        value={dateApplied} 
                        onChange={(e) => setDateApplied(e.target.value)} 
                        required 
                        min={twoYearsAgo}
                        max={today} 
                        // onBlur: validate that the selected date is within range.
                        onBlur={(e) => {
                            const inputDate = new Date(e.target.value);
                            const minDate = new Date(twoYearsAgo);
                            const maxDate = new Date(today);
                            if (inputDate < minDate) {
                                setDateApplied(twoYearsAgo);
                            }
                            else if (inputDate > maxDate) {
                                setDateApplied(today);
                            }
                        }}
                    />                    
                </div>
                {/* Submit Button */}
                <button type="submit">Add Application</button>
            </form>
        </div>
    );
};


export default JobApplicationForm;