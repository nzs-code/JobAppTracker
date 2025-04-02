import React, { useState } from 'react';
import JobApplicationEdit from './JobApplicationEdit';
import './JobApplicationPage.css';


// Functional Component
// Props: applications, onApplicationEdited (callback to refresh applications)
const JobApplicationList = ({ applications, onApplicationEdited }) => {

    // States for pagination and editing of the table
    const [editingApp, setEditingApp] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [applicationsPerPage] = useState(4);

    // EVENT HANDLER FUNCTION: handleEdit
    // - Activates edit mode by setting 'editingApp' to the selected application.
    const handleEdit = (app) => setEditingApp(app);
    
    // EVENT HANDLER FUNCTION: handleUpdate
    // - Called after an application is updated.
    // - Invokes the 'onApplicationEdited' callback to refresh the list.
    // - Exits edit mode by resetting 'editingApp' to null.
    const handleUpdate = () => {
        if (onApplicationEdited) onApplicationEdited();
        setEditingApp(null);
    };

    // Helper function: formatDate
    // Formats a date string to 'dd/mm/yyyy'
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    
    // Calculate pagination indices
    const indexLastJobApplication = currentPage * applicationsPerPage;
    const indexFirstJobApplication = indexLastJobApplication - applicationsPerPage;

    const currentApplications = applications.slice(indexFirstJobApplication, indexLastJobApplication);
    const totalNumPages = Math.ceil(applications.length / applicationsPerPage); 

    // EVENT HANDLER FUNCTION: handlePageChange
    // Updates the current page when a pagination button is clicked.
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="table-container">
            <h2>Job Applications Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Date Applied</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            <tbody>
                {currentApplications.map(app => (
                    <tr key ={app.id}>
                        <td>{app.companyName}</td>
                        <td>{app.position}</td>
                        <td>{app.status}</td>
                        <td>{formatDate(app.dateApplied)}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(app)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalNumPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        disabled={number === currentPage}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {/* Render the JobApplicationEdit component if an application is being edited */}
            {editingApp && (
                <JobApplicationEdit
                    application={editingApp}
                    onClose={() => setEditingApp(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default JobApplicationList;