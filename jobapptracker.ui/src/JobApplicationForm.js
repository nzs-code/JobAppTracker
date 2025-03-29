import React, { useState } from 'react';
import axios from 'axios';
import './JobApplicationPage.css';

const JobApplicationForm = ( {onApplicationAdded} ) => {

    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [dateApplied, setDateApplied] = useState('');

    const today = new Date().toISOString().split("T")[0];
    const twoYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
      .toISOString()
      .split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApplication = { companyName, position, status, dateApplied };

        axios.post('https://localhost:5001/applications', newApplication)
            .then(response => {
                console.log('Application added:', response.data);
                setCompanyName('');
                setPosition('');
                setStatus('');
                setDateApplied('');
                if (onApplicationAdded) onApplicationAdded();
        })
            .catch(error => {
                console.error('Error adding application:', error);
        });
    };

    return (
        <div className="form-container">
            <h2>Create Application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name:</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

                </div>
                <div>
                    <label>Position:</label>
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required >
                        <option value="">-- Select Status --</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div>
                    <label>Date Applied:</label>
                    <input type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required min={twoYearsAgo} max={today} onBlur={(e) => {
                        const inputDate = new Date(e.target.value);
                        const minDate = new Date(twoYearsAgo);
                        const maxDate = new Date(today);
                        if (inputDate < minDate) {
                            setDateApplied(twoYearsAgo);
                        }
                        else if (inputDate > maxDate) {
                            setDateApplied(today);
                        }
                    }}/>                    
                </div>
                <button type="submit">Add Application</button>
            </form>
        </div>
    );
};


export default JobApplicationForm;